
var trigger_offset = 5;

function is_trigger(player_data, trigger_data) {
    var player_x = player_data.x;
    var player_y = player_data.y;
    var x_pos = trigger_data.pos_x;
    var y_pos = trigger_data.pos_y;
    var x_trigger = player_x >= x_pos - trigger_offset && player_x <= x_pos + trigger_offset;
    var y_trigger = player_y >= y_pos - trigger_offset && player_y <= y_pos + trigger_offset;
    return x_trigger && y_trigger;
}

function check_triggers(player_data) {
    var trigger = undefined;
    for (let i = 0; i < triggers.length; i++) {
        const t = triggers[i];
        if (is_trigger(player_data, t) && !t.lock)
            trigger = t;
    }
    return trigger;
}

function trigger_recognize(player_data) {
    var result = undefined;
    if (typeof triggers != 'undefined' && triggers.length > 0) {
        trigger = check_triggers(player_data);
        if (typeof trigger !== 'undefined') {
            if (typeof trigger.action !== 'undefined') {
                if (trigger.one_time_use)
                    trigger.lock = true;
                result = trigger.action;
            }
        } else {
            if (intract_dialog_visible)
            {
                hide_intract_dialog();
                intract_dialog_visible = false;
            }
        }
    }
    return result
}