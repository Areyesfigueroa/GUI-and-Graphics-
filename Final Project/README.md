Idea description: Fireworks simulation

For my final I want to create a fireworks simulation. I plan on rendering a scene with multiple fireworks that the user can interact with. Each firework contains a different particle animation. Every particle animation will have their own variants of colors interpolating. I want this to be an interactive scene by allowing the user to pick their firework and click on the one he wants to ignite. 


Software: 

I will be using WebGL alongside Three.js. 

Stretch Goal:

A stretch goal would be to also include a way for the user to customize his firework creating his own particle animations at runtime. I’ve seen some of these example using three.js in which they have a GUI interface that the user can interact with. ex : Particle lifespan, radius, color range, speed and so on. Essentially each firework has its own customizable particle system.
If everything gets done sooner, another stretch goal would be to make the particles form shapes when exploding. This is something I would have to look into more in depth.   

Interesting Points:
Object Animations,
Particle Animations,
Color interpolation 


Project Weekly Breakdown:

Week 1:  Setup
Creating Scene,
Setting Camera,
Populate Scene

Week 2: Interpolation
Create object movement interpolation,
  Set up parameters for dynamic object traveling. ‘Stretch goal’,
  Set camera to follow relative to the object's(firework’s) position, 
Familiarizing myself with Three.js particles,  
Create Static particle systems

Week 3: Particle System
Set up first dynamic particle system,
Create parameters for dynamic particle system, 
Change Color interpolation,
Create different variations for each firework. How many different variations I create depend on how intricate each firework is. 

Week 4: Interface and User Interactions
Create GUI,
  Parameters for Firework travel path,
  Parameters for FireWork particles,
Create a reset method in order to fill more firework rockets into the scene, 
Allow for Mouse raycasting events for user input,
User can Click on any of the preset firework,
Allow for camera control at all times,
Clamp camera transforms and rotations

Week 5: Final Touches and Presentations:
Bug Fixes and Code Polishing,
Presentation Notes and PowerPoint. 
