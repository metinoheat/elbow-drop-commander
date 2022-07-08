controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (SharkyJumpCount < jumpmax) {
        Commander.vy = -150
        SharkyJumpCount += 1
    }
    Commander.sayText(SharkyJumpCount)
})
function Animation () {
    if (Commander.vy < 0) {
        Commander.setImage(assets.image`Macho_Jump`)
        First_Move = 0
    } else if (Commander.vy > 0) {
        Commander.setImage(assets.image`Elbowdropper Down`)
        if (Facing_Right == 1) {
            Commander.image.flipX()
        }
        First_Move = 0
    } else if (Commander.vx > 0 && (Facing_Right == 1 || First_Move == 0)) {
        animation.runImageAnimation(
        Commander,
        assets.animation`myAnim0`,
        100,
        true
        )
        First_Move = 1
    } else if (Commander.vx < 0 && (Facing_Right == 0 || First_Move == 0)) {
        animation.runImageAnimation(
        Commander,
        assets.animation`myAnim`,
        100,
        true
        )
        First_Move = 1
    } else if (Commander.vx == 0) {
        Commander.setImage(assets.image`Macho_Right_Run_1`)
        if (Facing_Right == 1) {
            Commander.image.flipX()
        }
    }
    SetFacing()
}
function SetFacing () {
    if (Commander.vx > 0) {
        Facing_Right = 0
    } else if (Commander.vx < 0) {
        Facing_Right = 1
    }
}
function Initialize () {
    jumpmax = 2
    scene.setBackgroundColor(6)
    tiles.setCurrentTilemap(tilemap`level1`)
    Facing_Right = 0
    Commander = sprites.create(assets.image`Macho_Right_Run_1`, SpriteKind.Player)
    controller.moveSprite(Commander, 100, 0)
    Gravity = 300
    SharkyJumpCount = 0
    tiles.placeOnRandomTile(Commander, sprites.dungeon.collectibleBlueCrystal)
    scene.cameraFollowSprite(Commander)
    First_Move = 0
    Commander.ay = Gravity
}
function floorcheck () {
    if (Commander.isHittingTile(CollisionDirection.Bottom)) {
        SharkyJumpCount = 0
    }
}
let Gravity = 0
let First_Move = 0
let Facing_Right = 0
let Commander: Sprite = null
let jumpmax = 0
let SharkyJumpCount = 0
Initialize()
game.onUpdate(function () {
    Animation()
    floorcheck()
})
