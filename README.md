### CONFERENCE SPEAKER APP

# COMPONENTS TREE

- App
  - Header - # USES: useState
  - Speakers - # USES: useState
    - SpeakersToolbar
    - SpeakersList - # USES: custom hook
      - Speaker
        - SpeakerImage
        - SpeakerDemographics
          - SpeakerFavorite

# HOOKS

    On App Component
        Hook: theme, setTheme
            theme used on App component to change site theme
            Header
                receives theme
                    theme used on Header component to change theme
            Speakers (receives theme and setTheme)
                SpeakersToolbar (receives theme and setTheme)
                    theme is used to set value on input field
                    setTheme is used by seting value using dropdown value

# NOTES

Manually starting next.js app
--- $ npm init -y
--- $ npm install react react-dom next
--- add script commnds for next.js on package.json
--- crete index.js file inside pages folder with initial component

Auto starting next.js app
--- $ npx crete-next-app <app_name>
--- or with typescript
--- $ npx crete-next-app --typescript <app_name>

Project at:
--- github.com/pkellner/pluralsight-designing-react-components-course-code

to Run dev server (scripts section in package.json)
---$ npm run dev

## TODO

    - Investigate rsuite placeholder error on console (does not work on App while being alone and with no parameters)
