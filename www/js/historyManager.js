class historyManager {

    // Local storage variable name
    static getLocalStorageName() { return 'historyLSVar'; }

    // Read history (* indicates that we're building an iterator)
    static* read(limit = 10) {
        // Read complete history value
        var current_history = localStorage.getItem(this.getLocalStorageName());

        // Split value into multiple lines
        var current_history_lines = current_history.split('\n');

        // Replace limit with length if there are too few entries
        var real_limit = (limit > current_history_lines.length ? (current_history_lines.length - 1) : limit);

        // Read lines until limit
        for(var i = 0; i < real_limit; i++) {
            yield JSON.parse(current_history_lines[i]);
        }

        // Return true as a default value
        return true;
    }

    // Append to history
    static append(object) {
        // Read complete history value
        var current_history = localStorage.getItem(this.getLocalStorageName());

        // Append new object on top of history variable
        var new_history = JSON.stringify(object) + '\n' + current_history;
        
        // Write the new value
        return localStorage.setItem(this.getLocalStorageName(), new_history);
    }

    // Reset history
    static reset() {
        // Write the new value
        return localStorage.setItem(this.getLocalStorageName(), '');
    }

}