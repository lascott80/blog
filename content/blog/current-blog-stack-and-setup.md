+++
title = "Current Blog Stack and Setup"
date = 2026-05-31T09:00:00-04:00
description = "A snapshot of the Hugo setup, theme structure, and content workflow powering the blog right now."
summary = "The blog is now running on Hugo with custom templates, hand-rolled styling, a light and dark theme toggle, and a straightforward Markdown content workflow that keeps everything easy to maintain."
tags = ["Tech", "Meta"]
+++

The blog has already gone through one important change: it now runs on Hugo, not Astro. I wanted the setup to feel simple, durable, and easy to keep evolving without adding much overhead.

This post is a snapshot of the stack and structure the site is using right now.

## Core Stack

- Hugo extended for the static site build and local development server
- Markdown content files for posts and standalone pages
- Custom Hugo layouts instead of an off-the-shelf theme
- Plain CSS for the visual system and responsive layout
- A small vanilla JavaScript helper for the light and dark theme toggle

## Content Structure

The site content lives in a small set of predictable places:

- `content/blog/` for posts
- `content/about.md` for the about page
- `content/uses.md` for the uses page
- `static/images/` for profile art and post images

That setup keeps writing lightweight. A new post is just a Markdown file with frontmatter for the title, date, summary, description, and tags.

## Layout and Design

The layout is custom-built to mirror the design direction I wanted:

- A bold hero section with the profile image and intro line
- A compact post feed on the homepage
- Dedicated list and single-post templates
- Deep blue gradients, bright cyan accents, and rounded cards

The design stays intentionally personal instead of feeling like a generic blog theme.

## Theme Toggle

One of the nicer additions is the theme switch in the header next to the RSS button.

Dark mode is the default, and the toggle flips the site into a light version of the same visual language. The selected mode carries across page navigation so the site feels consistent as you move around.

## Why Hugo Fits

Hugo has been a good fit for this site because it gets out of the way:

- Builds are fast
- Content is easy to manage in Git
- Templates are flexible enough for custom page structures
- The output is simple static HTML, CSS, JavaScript, and images

That makes it easy to focus on writing and design rather than maintenance.

## What I Want to Improve Next

- Expand tag pages and browsing
- Add more post images and visual detail to long-form articles
- Keep refining the light theme so it matches the dark theme more closely
- Publish more writing about Disney, software, and side projects

For now, this setup feels like a solid foundation: fast, readable, and easy to keep building on.
