//edit the constants here
const anim_time=0.25;  //fade out animation time in seconds
//edit other settings in stylesheet

const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Shell = imports.gi.Shell;

let text,appMenu,sig0,sig1,original_reactive,original_track_hover;

function _hideTitle() {if (text){
    Main.uiGroup.remove_actor(text);
    text = null;}
}


function _tween() {
 Tweener.addTween(text,
                     { opacity: 0,
                       time: anim_time,
                       transition: 'easeOutQuad',
                       onComplete: _hideTitle });}


function _showTitle() {
    if (!text) {
	let win = global.display.focus_window;
        text = new St.Label({ style_class: 'title-label', text: win.title });
        Main.uiGroup.add_actor(text);
    }

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(Math.floor(monitor.width / 2 - text.width / 2),
                      Math.floor(Main.panel.actor.get_height()));

}


function init() {
	appMenu=Main.panel.statusArea.appMenu.actor.get_parent();
	original_reactive=appMenu.reactive;
	original_track_hover=appMenu.track_hover;}


function enable() {
	appMenu.reactive=true;
	appMenu.track_hover=true;

	sig0=appMenu.connect('enter-event', _showTitle);
	sig1=appMenu.connect('leave-event', _tween);
}


function disable() {
	_hideTitle();

	appMenu.reactive=original_reactive;
	appMenu.track_hover=original_track_hover;

	appMenu.disconnect(sig0);
	appMenu.disconnect(sig1);
}
