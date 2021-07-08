// Beware, order matters!
// Also, this is not circular reference friendly :-)

// Before everything else, core and maths objects and
export * from "src/core/PropertyDecorator";
export * from "src/core/PropertyDrawer";
export * from "src/core/EventSubscriber";
export * from "src/core/Utils";

export * from "src/maths/Vector3";

// Then, scene objects
export * from "src/scene/Scene";
export * from "src/scene/SceneObject";
export * from "src/scene/primitives/Point";
export * from "src/scene/primitives/Segment";

// Then UI and 3D layers
export * from "src/view/visuals/Visual";
export * from "src/view/visuals/PointVisual";
export * from "src/view/visuals/SegmentVisual";
export * from "src/view/OrbitControls";
export * from "src/view/Viewport";
export * from "src/view/utils/Grid";
export * from "src/view/utils/TextSprite";

export * from "src/ui/Hierarchy";
export * from "src/ui/Inspector";
export * from "src/ui/MainMenu";
export * from "src/ui/PropertyDrawers";
export * from "src/ui/components/Switch";
