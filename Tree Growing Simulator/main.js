var waitTime = __config__.getNumber("waitTime")/5;
var showParticles = __config__.getBool("showParticles");
var allTheParticles = __config__.getBool("allTheParticles");

Player.isRunning = function(){
	let velocity = Player.getVelocity();
	return Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z) > 0.15;
};
Player.isSneaking = function(){
	return Entity.getSneaking(Player.get());
};
Player.getBlockPos = function(){
	pos = Player.getPosition();
	return {x: Math.floor(pos.x), y: Math.floor(pos.y-1.6), z: Math.floor(pos.z)};
}

var timer = 0, isGrowable = false;
Callback.addCallback("tick", function(){
	playerPos = Player.getBlockPos();
	block = World.getBlock(playerPos.x, playerPos.y-1, playerPos.z);
	if(World.getBlock(playerPos.x, playerPos.y, playerPos.z).id == 6 && (Player.isRunning() || Player.isSneaking())){
		if(!isGrowable && timer < waitTime){
			timer++;
		}
		else{
			if(!isGrowable)  isGrowable = true;
		}
	}
	else{
		isGrowable = false;
		timer = 0;
	}
	if(isGrowable && World.getBlock(playerPos.x, playerPos.y, playerPos.z).id == 6 && (block.id == 2 || block.id == 3 || block.id == 243)){
		isGrowable = false;
		timer = 0;
		World.setBlock(playerPos.x, playerPos.y-1, playerPos.z, 250, 0);
		World.setBlock(playerPos.x, playerPos.y-1, playerPos.z, block.id, block.data);
		if(showParticles){
			for(i=0; i<(allTheParticles?6:3); i++) Particles.addFarParticle(33, playerPos.x + 0.4 + Math.random()/7, playerPos.y + 0.6 + Math.random()/2, playerPos.z + 0.4 + Math.random()/7, 0, 0.5, 0, 20);
		}
	}
});