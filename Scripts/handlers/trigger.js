
var trigger_offset = 10;

function is_trigger(player_data, trigger_data) {
    var player_x = player_data.x;
    var player_y = player_data.y;
    var x_pos = trigger_data.pos_x;
    var y_pos = trigger_data.pos_y;
    var x_trigger = player_x >= x_pos - trigger_offset && player_x <= x_pos + trigger_offset;
    var y_trigger = player_y >= y_pos - trigger_offset && player_y <= y_pos + trigger_offset;
    return x_trigger && y_trigger;
}

function trigger_recognize(player_data) {
    var result = undefined;
    if (typeof have_trigger != 'undefined' && have_trigger == true) {
        trigger = check_triggers(player_data);
        if (typeof trigger !== 'undefined') {
            if (typeof trigger.action !== 'undefined') {
                if (trigger.one_time_use)
                    trigger.lock = true;
                result = trigger.action;
            }
        } else {
            if (intract_dialog_visible)
                hide_intract_dialog();
        }
    }
    return result
}