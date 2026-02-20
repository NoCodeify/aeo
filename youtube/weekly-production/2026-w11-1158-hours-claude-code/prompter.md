# Prompter: 1,158 Hours of Building With Claude Code in 10 Minutes

---

So after 1,158 hours in Claude Code, here's the thing nobody tells you. Most of what you'll find on YouTube about this tool is already outdated.

The system changes every few months. The workflows shift. What worked in October genuinely does not work in February. And I'm not talking about small stuff. I'm talking about fundamentally different ways of working.

I spent those hours building three production systems. A SaaS that does a hundred grand a year. A government access control system. And a full business running through AI agents and custom servers.

This is everything that actually matters. And there's one thing everyone recommends that made everything worse for me. I'll get to that.

---

So let's start from the beginning. My first project was DM Champ. It's an AI sales agent. You connect it to WhatsApp, Instagram, your website, whatever, and it handles customer conversations. Closes deals. Makes about a hundred grand a year.

Now DM Champ already existed when I started using Claude Code. Existing codebase. And honestly, the code was kind of a mess because it was originally built with a no-code tool and then exported.

And the setup was just... you open the repo and run Claude Code. It goes through everything. Reads the files, understands the structure. That's it. No migration. No restructuring. Just init and go.

Did it break stuff? Yeah. But so do normal developers. That's not a Claude Code problem. And with the latest models, it barely makes mistakes anymore.

But here's where it gets interesting. On top of DM Champ, I built a separate system with six AI agents that handle the entire support pipeline.

A bug comes in. One agent figures out what's wrong. Another one writes the fix. Another one messages the customer on WhatsApp saying it's resolved. I wake up, check the fix, approve it. Done.

Six agents. Four custom servers. All running in production.

And the setup file for this project? Just a basic CLAUDE.md explaining the repo and how to add new agents. Nothing fancy. When you're starting out, you don't need a complex setup. You just need to start.

---

Now here's where most people go wrong. And I made this exact mistake.

So once DM Champ was running, I started working on a much bigger project. Government access control system. You know, tap-to-enter badges, admin dashboard, mobile app. The whole thing. Over 8,000 files.

And I thought, well, Claude Code is amazing, right? So let me just let it build everything. Fully autonomous. End to end. No human checking anything.

It doesn't work.

And I know that's not what you want to hear because everyone on the internet is telling you to just let AI do everything. But for anything going into production, the bottleneck is checking whether the code actually works.

Claude can write tests, but they're basic. And testing the actual interface? What takes you a minute, just clicking around and seeing if things look right, takes the AI fifteen minutes. It has to open a browser, take screenshots, analyze them. It doesn't have that visual speed yet.

So the real workflow is: AI builds fast, human verifies. That's it. Don't skip the verify step. I tried. It cost me weeks.

But that wasn't even the real lesson from this project. The real lesson was something I stumbled into by accident.

---

So I'm working on this government project. Twenty-seven features across the app. And Claude keeps losing context. It doesn't know what a feature is supposed to do. It's mixing things up. Writing code that runs but doesn't fit the system.

And I'm thinking, okay, the model isn't stupid. I've seen what it can do. So the problem has to be on my end.

So I reorganized everything. One folder per feature. Authentication gets its own folder. Access badges get their own folder. Permissions, locations, cards. Every feature isolated.

Fifteen features on the backend. Twelve on the frontend. Each one self-contained.

But here's the part that made the real difference. Every single feature folder gets its own instruction file. Not just a description. I'm talking about what the feature is for, how it works, what the current status is. Everything Claude needs to understand the context.

Twenty-seven of these across the whole project. So when Claude works on the access badge feature, it automatically loads all of that context. It knows what the feature is for, how it connects to the rest of the system, what's already been built.

That was the unlock. Claude is only as good as the context you give it. No context? It'll write code that runs but makes no sense.

The other thing I did is project management inside the repo. Not Jira. Not Linear. Just text files.

107 task files. Todo, in progress, completed, blocked. Dependencies between tasks.

Why not a real project management tool? Because Claude can read local files instantly. The moment you make it talk to an external tool through an API, it's slower and less reliable. We actually built a custom integration with ClickUp, and it's still slower than just reading a text file. For an AI, local is king.

So at this point I've got a SaaS running on Claude Code, a government system with a proper structure, and I'm thinking, okay, I've figured this out.

But then things got a lot bigger.

---

Quick thing. If you're watching this and you want to set up Claude Code for a real project, I'm building a community called Claudify where we do exactly that. Real builds, not toy projects. Link in description.

---

So the third project isn't even a project. It's my entire business running through Claude Code.

I run a consulting business, a YouTube channel, a SaaS product, and client delivery. All from one repo. Over a thousand files.

Seven custom MCP servers. And when I say custom, I mean I built these myself. One checks how brands appear when you ask ChatGPT or Gemini a question. One does keyword research. One generates images. One finds stock video. One scans what's trending on GitHub and Hacker News for content ideas.

Why build your own? Because the ones other people have made don't do what you actually need for real work. Every time I hit that wall, I ended up building my own. That's the pattern.

Now here's the big one. And this goes against what basically everyone is saying right now.

Everyone talks about giving agents roles. Make a frontend developer agent. A PM agent. A designer agent. The government project actually has fifteen agents set up like this. And honestly? It doesn't make things noticeably better. They work, they run, but the output isn't really different from just using Claude Code directly with good context.

What actually makes a difference is giving agents specific tasks. Not "be a developer." It's "take this transcript and generate a video timeline." Or "take this data and create a client report." Or "find the best GIFs for each section of this script."

Each agent gets specific tools and specific context. They do one thing well. Fourteen of these, plus twenty-four skills. A skill is basically a set of instructions for a specific job. So instead of explaining how to write a video script every time, Claude just loads the skill and knows exactly what to do. Same for audits, reports, timelines. One skill per job.

And the latest evolution is these task agents working together in teams. Not one agent calling another. Actual teams with a shared task list.

So I have a command that says "produce this video." It kicks off a team. One agent builds the timeline. Another one finds GIFs. Another one sources stock footage. They're all working in parallel off the same task list, coordinating with each other.

That's the part that feels genuinely new. I'm not managing each agent. They pick up tasks, do their work, report back. It's the closest thing to having an actual team.

Now you might be wondering, when do you use a sub-agent versus a full team? Simple. A sub-agent is for one-off tasks. You send it off, it does the thing, it's done. The context is gone. A team is when you need back-and-forth. Multiple agents coordinating, passing work between each other, building on what the others did. That's the difference.

And here's something nobody talks about. Just like your code accumulates technical debt, your Claude Code setup does too.

Skills get outdated. Agents reference old patterns. Instructions start contradicting each other. You wrote something three months ago that's now wrong, and the AI is following those old instructions instead of the new ones.

I have a 346-line document just for how to maintain the AI setup itself. Every time something gets added, I clean up the whole structure. Same way you'd clean up code. And sometimes Claude creates new shortcuts on its own. It noticed a workflow I kept repeating and just made a command for it without me asking.

And the last thing. The workflow keeps changing. When I started, you had to approve every single edit. Then I realized you can bypass that. Then plan mode came out, where Claude plans first and you review before it builds. Now you just say "think about this first" in plain English and it does.

That's four different workflows in less than a year. If you're watching a Claude Code tutorial from six months ago, it's probably teaching you the old way.

---

Alright. So remember that thing I said at the beginning? The one thing everyone recommends that made everything worse?

It's adding everything at once. Every MCP server you can find. Every skill. Every plugin. People treat it like a shopping spree. More tools, more power.

It's the opposite. You give Claude forty tools and it doesn't know which one to use. Quality goes down.

The government project has fifteen agents. But I didn't start with fifteen. I started with zero. Hit a wall. Added one. Hit another wall. Added another. Every single one earned its place.

Start with nothing. Add things only when you feel the pain of not having them. Less is more until it isn't.

---

So that's 1,158 hours compressed. You start by just opening your repo and going. Don't overthink it. It works on messy codebases. It works on existing projects.

Then you structure everything. One folder per feature. Context files everywhere. Tasks inside the repo. And always a human checking anything that goes to production.

And eventually you build a system around it. Custom servers when the generic ones don't cut it. Task agents instead of role agents. And you maintain that system the same way you maintain your code.

The difference between ten hours in Claude Code and a thousand hours isn't knowing more features. It's knowing which ones to ignore.

If you want to see the actual repo structures, agent configs, and workflows I use, I share all of that inside Claudify. Link in the description.

I'll see you in the next one.
