function loadAnimations(Q){
    Q.compileSheets("link.png","link.json");
	Q.animations("link-anim",{
		stop_r: {frames:[0], rate:1, sheet:"link-standing", flip:false},
		stop_l: {frames:[0], rate:1, sheet:"link-standing", flip:"x"},
		walk_right: {frames: [0,1,2],rate: 1/6, sheet:"link-walking", flip:false, next: "stop_r"},
		walk_left: {frames: [0,1,2],rate: 1/6, sheet:"link-walking", flip:"x", next: "stop_l"},
		jump_right: {frames: [0], sheet:"link-jumping", flip:false},
		jump_left: {frames: [0], sheet:"link-jumping", flip:"x"},
		falling_right: {frames: [1], sheet:"link-jumping", flip:false, next: "stop_r"},
		falling_left: {frames: [1], sheet:"link-jumping", flip:"x", next: "stop_l"},
		attack_right: {frames: [0], sheet:"link-attacking", flip:false, next: "stop_r"},
		attack_left: {frames: [0], sheet:"link-attacking", flip:"x", next: "stop_l"}
	});

    Q.compileSheets("armos.png","armos.json");
    Q.animations("armos-anim", {
		walk_r: {sheet: "armos-walking", frames:[0, 1, 2], rate: 1/2, flip:false},
		walk_l: {sheet: "armos-walking", frames:[0, 1, 2], rate: 1/2, flip:"x"},
		attack_r: {sheet: "armos-attacking", frames:[0, 1], rate: 1/5, flip:false, next:"walk_r"},
		attack_l: {sheet: "armos-attacking", frames:[0, 1], rate: 1/5, flip:"x", next:"walk_l"}
	});

	Q.compileSheets("stalfos.png","stalfos.json");
    Q.animations("stalfos-anim", {
		walk_r: {sheet: "stalfos-walking", frames:[0, 1, 2], rate: 1/2, flip:false},
		walk_l: {sheet: "stalfos-walking", frames:[0, 1, 2], rate: 1/2, flip:"x"},
		attack_r: {sheet: "stalfos-attacking", frames:[0, 1], rate: 1/5, flip:false, next:"walk_r"},
		attack_l: {sheet: "stalfos-attacking", frames:[0, 1], rate: 1/5, flip:"x", next:"walk_l"}
	});

	Q.compileSheets("moblin.png","moblin.json");
    Q.animations("moblin-anim", {
		walk_r: {sheet: "moblin-walking", frames:[0, 1, 2], rate: 1/2, flip:false},
		walk_l: {sheet: "moblin-walking", frames:[0, 1, 2], rate: 1/2, flip:"x"},
		attack_r: {sheet: "moblin-attacking", frames:[0], rate: 1/5, flip:false, next:"walk_r"},
		attack_l: {sheet: "moblin-attacking", frames:[0], rate: 1/5, flip:"x", next:"walk_l"},
		
		kneel_r: {sheet: "moblin-knee", frames:[0, 1], rate: 1/2, flip:false, next:"throwSpear_r"},
		throwSpear_r: {sheet: "moblin-throw", frames:[0, 1], rate: 1/2, flip:false, next:"throwned_r"},
		throwned_r: {sheet: "moblin-throw", frames:[2], rate: 1/2, flip:false},
		
		kneel_l: {sheet: "moblin-knee", frames:[0, 1], rate: 1/2, flip:"x", next:"throwSpear_l"},
		throwSpear_l: {sheet: "moblin-throw", frames:[0, 1], rate: 1/2, flip:"x", next:"throwned_l"},
		throwned_l: {sheet: "moblin-throw", frames:[2], rate: 1/2, flip:"x"}
	});
	
	Q.compileSheets("acheman.png","acheman.json");
    Q.animations("acheman-anim", {
		walk_r: {sheet: "acheman-walking", frames:[0, 1], rate: 1/2, flip:false},
		walk_l: {sheet: "acheman-walking", frames:[0, 1], rate: 1/2, flip:"x"},
		attack_r: {sheet: "acheman-walking", frames:[0, 1], rate: 1/5, flip:false, next:"walk_r"},
		attack_l: {sheet: "acheman-walking", frames:[0, 1], rate: 1/5, flip:"x", next:"walk_l"}
	});
	
	Q.compileSheets("militron.png","militron.json");
    Q.animations("militron-anim", {
		walk_r: {sheet: "militron-walking", frames:[0, 1, 2], rate: 3/4, flip:false},
		//walk_r: {sheet: "militron-walking2", frames:[0, 1], rate: 3/4, flip:false},
		walk_l: {sheet: "militron-walking", frames:[0, 1, 2], rate: 3/4, flip:"x"},
		//walk_l: {sheet: "militron-walking2", frames:[0, 1], rate: 3/4, flip:"x"},
		
		attack_r: {sheet: "militron-attacking", frames:[0], rate: 1/2, flip:false, next:"walk_r"},
		attack_l: {sheet: "militron-attacking", frames:[0], rate: 1/2, flip:"x", next:"walk_l"},
		
		fire_r: {sheet: "militron-attacking", frames:[0], rate: 1/2, flip:false, next:"fire_r2"},
		fire_r2: {sheet: "militron-attacking2", frames:[0], rate: 1/2, flip:false},
		
		fire_l: {sheet: "militron-attacking", frames:[0], rate: 1/2, flip:"x", next:"fire_l2"},
		fire_l2: {sheet: "militron-attacking2", frames:[0], rate: 1/2, flip:"x"}
	});
	Q.compileSheets("militronFire.png","militronFire.json");
    Q.animations("militronFire-anim", {
		anim: {frames:[0, 1], rate:1/3, loop:true}
	});
	
	Q.compileSheets("ganon.png","ganon.json");
    Q.animations("ganon-anim", {
		walk_r: {sheet: "ganon-walking", frames:[0, 1, 2], rate: 1/2, flip:false},
		walk_l: {sheet: "ganon-walking", frames:[0, 1, 2], rate: 1/2, flip:"x"},
		attack_r: {sheet: "ganon-attacking", frames:[0, 1], rate: 1/5, flip:false, next:"walk_r"},
		attack_l: {sheet: "ganon-attacking", frames:[0, 1], rate: 1/5, flip:"x", next:"walk_l"}
	});
	Q.compileSheets("ganonFire.png","ganonFire.json");
    Q.animations("ganonFire-anim", {
		anim: {frames:[0, 1], rate:1/3, loop:true}
	});
	Q.compileSheets("flame.png","flame.json");
    Q.animations("flame-anim", {
		anim: {frames:[0, 1, 2], rate:1/3, loop:true}
	});
	Q.compileSheets("ganonDeath.png","ganonDeath.json");
    Q.animations("ganonDeath", {
		explode: {frames:[0, 1, 2], rate:2/5}
	});

    Q.compileSheets("efectos.png","enemyDeath.json");
    Q.animations("enemyDeath", {
		explode: {frames:[0, 1], rate:1/3}
	});

	Q.compileSheets("key.png","key.json");
    Q.animations("key-anim", {
		anim: {frames:[0, 1, 2], rate:1/3, loop:true}
	});

	Q.compileSheets("efectos.png","bombExplosion.json");
    Q.animations("bomb-explosion-anim", {
		explode: {frames:[0, 1, 2], rate:1/3, loop:false}
	});

	Q.compileSheets("triforce.png","triforce.json");
    Q.animations("triforce-anim", {
		shine: {frames:[0, 1, 2], rate:1/2, loop:true}
	});

	Q.compileSheets("heartContainer.png","heartContainer.json");
    Q.animations("heartContainer-anim", {
		anim: {frames:[0, 1, 2], rate:1/3, loop:true}
	});
	
	Q.compileSheets("doors.png","door.json");
    Q.animations("door-anim", {
		close: {sheet:"door-close", frames:[0], rate:1/3},
		medium: {sheet:"door-medium1", frames:[0], rate:1/3, next:"medium2"},
		medium2: {sheet:"door-medium2", frames:[0], rate:1/3, next:"open"},
		open: {sheet:"door-open", frames:[0], rate:1/3}
	});
	
	Q.compileSheets("rupeeFrames.png","rupee.json");
    Q.animations("rupee-anim", {
		anim: {frames:[0, 1, 2], rate:1/3, loop:true}
	});
	
	Q.compileSheets("waterFrames.png","water.json");
    Q.animations("water-anim", {
		anim: {frames:[0, 1, 2, 3], rate:1/3, loop:true}
	});
}