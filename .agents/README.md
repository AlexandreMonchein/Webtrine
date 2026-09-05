# Skills

Skills are reusable prompt templates that give the agent specialized workflows for common tasks. They live in `.agents/skills/<name>/SKILL.md`.

## Available skills

| Skill          | Trigger                                                     | What it does                                                                                         |
| -------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| component-creation | "create component", "new component", "banner/cards/description component" | Creates new React components following Webtrine Design System patterns: 6 required files (component, CSS Modules, types, stories, docs, tests), mobile-first responsive design, Overview story for Chromatic, French stories. Requires NAME + TYPE + DESCRIPTION before starting. |
| css-modules-migration | "migrate to CSS Modules", "convert styled components", "remove styled-components" | Migrates React components from Styled Components to CSS Modules: converts .styled.ts to .module.css, implements mandatory CSS nesting for all selectors, converts conditional props to classNames(), removes font-properties, applies mobile-first breakpoints with nested media queries. |

## Usage

### Explicit (slash command)

Type the skill name as a slash command:

```
/component-creation Create a team component of type description to display team members in a grid
```

```
/css-modules-migration Migrate the banner component from styled-components to CSS Modules
```

Arguments after the command are passed to the skill as context.

### Implicit (automatic trigger)

Some skills activate without explicit invocation:

- **component-creation**: Activates when you ask to create a new component (banner, cards, description, footer, navbar, etc.)
- **css-modules-migration**: Activates when you ask to migrate from Styled Components to CSS Modules

### Natural language

You can also just describe what you want:

**Component Creation:**
- "Create a new team component to display our team members"
- "I need a contact banner for the contact page"
- "Build a cards component to show our services"

**CSS Modules Migration:**
- "Migrate the banner component to CSS Modules"
- "Convert this styled component to CSS Modules"
- "Remove styled-components from the button component"

The agent matches intent to the right skill automatically.

## Adding new skills

Each skill is a directory under `.agents/skills/` containing a `SKILL.md` file with frontmatter:

```yaml
---
name: skill-name
description: When and why to use this skill
---
```

The rest of the file is the prompt template - instructions the agent follows when the skill activates. Use `/skill-creator` to scaffold a new skill.
