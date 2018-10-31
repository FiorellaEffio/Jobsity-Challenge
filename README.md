# jobsity-challenge

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Assignment
Create an application that allows a user to slice up a video (sample video: https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4) into clips.

## Mandatory Features

- [X] An HTML5 video player that utilizes media fragments
- [X] A list of clips to be played in the video player
- [X] The first item in the list should be the full video
- [X] An interface to add new clips to the list by specifying a name, start time, and end time
- [X] The ability to delete clips from the list (excluding the full video item)
- [X] The ability to edit existing clips in the list
- [X] The ability to play clips in the video player

## Bonus
- [X] The ability to add arbitrary ‘tags’ to clips so that they can be filtered by the tag name.
- [X] Hotkeys to jump between the current clip and next and previous clips (if there are any)
- [X] The ability to automatically jump to the next clip after it finishes, with a 3 second waiting period and appropriate loading animation.(falta animación)
- [X] The ability to ‘save’ clips for persistent use.(localStorage)
- [X] The ability to reuse the player and playlist on another page without the editing capabilities (Doing)


- [ ] Markers on the video player timeline that denote where a clip starts (full video only).
- [ ] Clicking the marker chooses that clip and plays it from that point.


