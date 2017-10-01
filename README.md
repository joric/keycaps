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

Rendered .stl files are then processed with Blender's "Decimate" and "Edge Split" modifiers.
Smoothing groups ("Auto Smooth") do not get exported so I had to use Edge Split geometry modifier.
Texture UVs assigned from Blender, using "Project from View" and "Project from View (Bounds)" for
the selected visible geometry. All modifer stacks should be collapsed for proper exporting.


## License

Public Domain

All copyrights to resource files belong to their respective owners.

## References

* Keyboard layouts: https://github.com/ijprest/keyboard-layout-editor
* JavaScript 3D library: https://github.com/mrdoob/three.js
* OpenSCAD models: https://github.com/rsheldiii/openSCAD-projects
* OpenSCAD and Blender SA models: https://github.com/getclacking/SA-profile-keys-3D-models
