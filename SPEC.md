# Spec: Mobile Chat App

Do not add features beyond what is listed here.

---

## Objective

Build a chat app that can:

- list contact conversations
- open a contact's chat history
- send messages
- view a contact profile

Reviewers score:

- React Native
- performance
- state management
- React Query (caching, mutations, infinite queries, optimistic updates)
- app architecture
- UI/UX

AI tools are allowed. Document how they were used.

---

## Required stack

| Layer | Requirement |
| --- | --- |
| Framework | React Native, with or without Expo |
| Data fetching | React Query for API caching |
| Client state | Zustand, Redux, or MobX |
| UI library | optional, any |

---

## API

Base URL: `https://responserift.dev/`

| Resource | Path | Use |
| --- | --- | --- |
| Contacts / conversations | `api/users` | chat list, profile |
| Messages | `api/posts` | chat history, send |

---

## Screens and features

### 1. Bottom tabs

- Chat tab
- Settings tab

### 2. Chats tab

- `GET api/users` for the conversation list
- infinite-scroll pagination
- each row shows:
  - avatar
  - name
  - last message (placeholder)
  - timestamp (placeholder)
- tap a row → Chat screen

### 3. Chat screen

- `GET api/posts` for that user's messages
- composer at the bottom
- send via `POST api/posts`
- optimistic update on the send mutation
- tap header (contact avatar) → Profile screen

### 4. Profile screen

- fetch profile with React Query
- show:
  - name
  - avatar
  - phone number
- Block / Unblock toggle in global state (Zustand / Redux / MobX)

### 5. Settings screen

- static info, e.g. your name and app version

---

## Optional

- smooth transitions
- automation tests
- performance work
- empty-state placeholders

---

## Deliverables

Required in `README.md`:

- project structure
- architecture notes
- screenshots and/or screen recordings
- how AI was used (if used)

Submission:

- public GitHub repo
- APK committed in that repo (required)
- deadline: 4 days
