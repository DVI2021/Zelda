var game = function() {

var Q = window.Q = Quintus()
		.include(["Sprites", "Scenes", "Input", "2D", "UI", "Anim", "TMX", "Touch", "Audio"])
        .setup("myGame", {
			width: 800,
			height: 600,
			scaleToFit: true
		})
        .controls().enableSound().touch();

	loadScenes(Q);
	loadPlayer(Q);
	loadEnemies(Q);
	loadMiscellaneous(Q);
	//Q.debug=true;

	Q.load(["link.png", "link.json", "tileset.png", "tileset2.png","Level1.tmx", "Level2.tmx", "Level3.tmx", 
			"desert.png", "sword.png", "jump1.mp3", "jump2.mp3", "title-screen.png", "title.mp3", 
			"hyrule-field-80.mp3", "scream.mp3", "attack1.mp3", "attack2.mp3", "attack3.mp3", "attack4.mp3",
			"armos.png", "armos.json", "armos-hit.mp3", "armos-dead.mp3", "armos-hit-sword.mp3", 
			"armos-dead-sword.mp3", "armos-attack.mp3", "link-hurt.mp3", "link-dead.mp3",
			"efectos.png", "enemyDeath.json", "heart.png", "lowHealth.mp3", "GameOver.mp3",
			"heal.mp3", "emptyHeart.png", "key.png", "key.json", "key.mp3","bomb.png", 
			"bombExplosion.json", "bombLit.mp3", "bombExplosion.mp3", "bombPickup.mp3",
			"door.png", "openDoor.mp3", "closedDoor.mp3", "triforce.png", "triforce.json", "WinGame.mp3",
			"stalfos.png", "stalfos.json", "stalfos-attack.mp3", "stalfos-dead.mp3", "stalfos-hit.mp3",
			"stalfos-hit-sword.mp3", "moblin.png", "moblin.json", "moblin-hit-sword.mp3", "moblin-hit.mp3",
			"moblin-attack.mp3", "moblin-dead.mp3", "heartContainer.png", "heartContainer.json", "lifeIncrease.mp3",
			"semiHeart.png", "semiHeart.png", "spear.png", "ray.png", "doors.png", "door.json", "shield.png",
			"helmet.png", "book.png", "gauntlet.png", "water.png", "waterFrames.png", "flame.png", "fireBall.png",
			"rupee.png", "rupeeFrames.png", "rupee.json", "terraria1.jpg", "Level1bg.png", "Level2bg.png", "rupee.mp3", "shield.mp3",
			"fire.mp3", "get-item.mp3", "stats-ray.mp3", "text-helmet.mp3", "water.json", "militron.png", "militron.json",
			"militronFire.png", "militronFire.json", "hyrule-castle.mp3", "credits-music.mp3", "acheman.png", "acheman.json",
			"ganon.png","ganon.json", "ganonFire.png", "ganonFire.json", "flame.json", "Level3bg.png", "final-battle.mp3",
			"ganonDeath.png", "ganonDeath.json", "ganon-attack.mp3", "ganon-dead.mp3", "ganon-hit.mp3", "ganon-laugh.mp3",
			"acheman-attack.mp3", "acheman-dead.mp3", "acheman-hit.mp3","militron-attack.mp3", "militron-dead.mp3", "militron-hit.mp3"],
		function(){
			loadAnimations(Q);			
			
			Q.stageScene("blackScreen");
		}
	);

}