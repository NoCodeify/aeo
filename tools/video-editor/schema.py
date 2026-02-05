"""
Schema validation for edit timelines.

Ensures edit format is correct before rendering.
"""

from typing import List, Dict, Any, Optional
from dataclasses import dataclass


VALID_TYPES = ["full", "punch_zoom", "split_50", "full_content", "pip", "ken_burns"]
VALID_CORNERS = ["br", "bl", "tr", "tl"]
VALID_SIDES = ["left", "right"]
VALID_PAN_DIRECTIONS = ["left", "right", "up", "down", "none"]


@dataclass
class ValidationError:
    index: int
    field: str
    message: str

    def __str__(self):
        return f"Edit {self.index}: {self.field} - {self.message}"


def validate_edit(edit: Dict[str, Any], index: int) -> List[ValidationError]:
    """Validate a single edit entry."""
    errors = []

    # Required fields
    if "type" not in edit:
        errors.append(ValidationError(index, "type", "Missing required field"))
    elif edit["type"] not in VALID_TYPES:
        errors.append(ValidationError(index, "type", f"Invalid type '{edit['type']}'. Valid: {VALID_TYPES}"))

    if "start" not in edit:
        errors.append(ValidationError(index, "start", "Missing required field"))
    elif not isinstance(edit["start"], (int, float)):
        errors.append(ValidationError(index, "start", "Must be a number"))

    if "end" not in edit:
        errors.append(ValidationError(index, "end", "Missing required field"))
    elif not isinstance(edit["end"], (int, float)):
        errors.append(ValidationError(index, "end", "Must be a number"))

    # Validate start < end
    if "start" in edit and "end" in edit:
        if isinstance(edit["start"], (int, float)) and isinstance(edit["end"], (int, float)):
            if edit["start"] >= edit["end"]:
                errors.append(ValidationError(index, "start/end", "start must be less than end"))

    # Type-specific validation
    edit_type = edit.get("type")

    if edit_type in ["split_50", "full_content", "pip", "ken_burns"]:
        if "content" not in edit:
            errors.append(ValidationError(index, "content", f"Required for type '{edit_type}'"))

    if edit_type == "split_50":
        if "speaker_side" in edit and edit["speaker_side"] not in VALID_SIDES:
            errors.append(ValidationError(index, "speaker_side", f"Invalid. Valid: {VALID_SIDES}"))

    if edit_type == "pip":
        if "corner" in edit and edit["corner"] not in VALID_CORNERS:
            errors.append(ValidationError(index, "corner", f"Invalid. Valid: {VALID_CORNERS}"))

    if edit_type == "punch_zoom":
        if "zoom" in edit:
            if not isinstance(edit["zoom"], (int, float)):
                errors.append(ValidationError(index, "zoom", "Must be a number"))
            elif edit["zoom"] < 1:
                errors.append(ValidationError(index, "zoom", "Must be >= 1"))

    if edit_type == "ken_burns":
        for field in ["zoom_start", "zoom_end"]:
            if field in edit and not isinstance(edit[field], (int, float)):
                errors.append(ValidationError(index, field, "Must be a number"))
        if "pan_direction" in edit and edit["pan_direction"] not in VALID_PAN_DIRECTIONS:
            errors.append(ValidationError(index, "pan_direction", f"Invalid. Valid: {VALID_PAN_DIRECTIONS}"))

    return errors


def validate_timeline(edits: List[Dict[str, Any]]) -> List[ValidationError]:
    """
    Validate entire edit timeline.

    Returns list of errors (empty if valid).
    """
    all_errors = []

    for i, edit in enumerate(edits):
        errors = validate_edit(edit, i)
        all_errors.extend(errors)

    # Check for gaps or overlaps
    sorted_edits = sorted(enumerate(edits), key=lambda x: x[1].get("start", 0))

    for i in range(1, len(sorted_edits)):
        prev_idx, prev_edit = sorted_edits[i - 1]
        curr_idx, curr_edit = sorted_edits[i]

        prev_end = prev_edit.get("end", 0)
        curr_start = curr_edit.get("start", 0)

        if curr_start < prev_end:
            all_errors.append(ValidationError(
                curr_idx, "start",
                f"Overlaps with edit {prev_idx} (ends at {prev_end}s)"
            ))

    return all_errors


def validate_and_report(edits: List[Dict[str, Any]]) -> bool:
    """Validate and print any errors. Returns True if valid."""
    errors = validate_timeline(edits)

    if errors:
        print(f"Validation failed with {len(errors)} error(s):")
        for error in errors:
            print(f"  - {error}")
        return False
    else:
        print("Timeline is valid.")
        return True


if __name__ == "__main__":
    import json
    import sys

    if len(sys.argv) < 2:
        print("Usage: python schema.py <timeline.json>")
        sys.exit(1)

    with open(sys.argv[1]) as f:
        edits = json.load(f)

    valid = validate_and_report(edits)
    sys.exit(0 if valid else 1)
