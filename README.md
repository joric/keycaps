# Keycaps

Keyboard layout editor and renderer

Demo: http://joric.github.io/keycaps


## Software

OpenSCAD is used for prototyping. Objects are rendered by THREEjs with JSON scene exported from Blender.

### OpenSCAD

OpenSCAD models rendered into .stl and slightly edited in Blender, then exported using THREEjs JSON exporter.
Mind that [key_v2](https://github.com/rsheldiii/openSCAD-projects) OpenSCAD set takes a lot of time
to render, especially for SA (spherical) geometry - takes about 30 minutes a key,
while DCS is rendered in a few seconds (see utils directory). Rendering time can be reduced with smaller subdivision ($fn) settings.


### Blender

* Rendered .stl files are then processed with Blender's "Decimate" and "Edge Split" modifiers.
* Smoothing groups ("Auto Smooth") do not get exported so I had to use Edge Split geometry modifier.
* All modifer stacks should be collapsed for proper exporting.
* Texture UVs are assigned from Blender too, using "Project from View" for the visible geometry.
* Proper texture offsets and texture scale are also important, study existing keys for examples.
* Use 1u=1mm (or scale grid to 19.05mm), so standard keycap is about 19x19, 2u keycap is 19x38 and so on.
* After manual exporting with io_threejs, add `data=` to the beginning of the json file.

Sadly the scripts and Blender are a little bit obsolete by now (I used Blender 2.67 and threejs r87).


## License

Public Domain

All copyrights to resource files belong to their respective owners.

## References

* [Keyboard layout editor](https://github.com/ijprest/keyboard-layout-editor)
* [JavaScript 3D library](https://github.com/mrdoob/three.js)
* [OpenSCAD models by rsheldiii](https://github.com/rsheldiii/openSCAD-projects)
* [OpenSCAD and Blender SA models](https://github.com/getclacking/SA-profile-keys-3D-models)
* [Keyset database (Google doc)](https://docs.google.com/spreadsheets/d/1byRpKCGR8tbV8tyTb3vwhLyiOcCgxbRTDUptnWgG3IE/edit#gid=0)
* [Reddit post about this project](https://www.reddit.com/r/MechanicalKeyboards/comments/7hdxun/has_this_neat_rendering_of_various_keyboard/)
* [CAD and code for Wookiee's Custom Keyboard, lots of keycap models made in Solidworks](https://github.com/dankwookiee/Kieeboard)

