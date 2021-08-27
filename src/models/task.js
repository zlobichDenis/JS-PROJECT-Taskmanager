export default class Task { 
    constructor(data) { 
        this.id = data[`id`];
        this.description = data[`description`] || ``;
        this.dueDate = data[`dueDate`] ? new Date(data[`due_date`]) : null;
        this.repeatingDays = data[`repeatingDays`];
        this.color = data[`color`];
        this.isFavorite = Boolean(data[`isFavorite`]);
        this.isArchive = Boolean(data[`isArchive`]);
    }

    static parseTask(data) { 
        return new Task(data);
    }

    static parseTasks(data) { 
        return data.map(Task.parseTask);
    }
    
    toRaw() { 
        return {
            "id": this.id,
            "description": this.description,
            "due_date": this.dueDate ? this.dueDate.toISOString() : null,
            "repeating_days": this.repeatingDays,
            "color": this.color,
            "is_favorite": this.isFavorite,
            "is_archive": this.isArchive,
        };
    }

    static clone(data) { 
        return new Task(data.toRaw());
    }
}
