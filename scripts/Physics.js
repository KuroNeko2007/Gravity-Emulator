class Vector2 {
    constructor(a, b) {
        if (typeof a === "object") {
            this.x = a.x;
            this.y = a.y;
        }
        else if (b !== undefined) {
            this.x = a;
            this.y = b;
        }
        else {
            this.x = 0;
            this.y = 0;
        }
    }
    add(a, b) {
        let r = new Vector2(this.x, this.y);
        if (typeof a === "object") {
            r.x += a.x;
            r.y += a.y;
        }
        else if (b !== undefined) {
            r.x += a;
            r.y += b;
        }
        return r;
    }
    negate() {
        return new Vector2(-this.x, -this.y);
    }
    subtractThisFrom(a, b) {
        return this.negate().add(a, b);
    }
    multiplyBy(factor) {
        return new Vector2(this.x * factor, this.y * factor);
    }
}
const entityList = [];
class Entity {
    constructor(position, mass, radius, velocity) {
        // @ts-ignore
        this.uuid = crypto.randomUUID();
        entityList.push(this);
        if (velocity === undefined) {
            this.velocity = new Vector2(0, 0);
        }
        else {
            this.velocity = new Vector2(velocity);
        }
        this.position = position;
        this.mass = mass;
        this.radius = radius;
        this.color = { red: 0, green: 0, blue: 0 };
        this.borderColor = { red: 0, green: 0, blue: 0 };
    }
    static modifyLaws(newLaws) {
        this.laws = Object.assign(Object.assign({}, this.laws), newLaws);
    }
    setColor(color) {
        this.color = Object.assign(Object.assign({}, this.color), color);
    }
    setBorder(color) {
        this.borderColor = Object.assign(Object.assign({}, this.borderColor), color);
    }
    get colorString() {
        return `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
    }
    get borderColorString() {
        return `rgb(${this.borderColor.red}, ${this.borderColor.green}, ${this.borderColor.blue})`;
    }
    update() {
    }
    draw() {
        if (Entity.laws.ctx === undefined) {
            return;
        }
        Entity.laws.ctx.save();
        Entity.laws.ctx.fillStyle = this.colorString;
        Entity.laws.ctx.strokeStyle = this.borderColorString;
        Entity.laws.ctx.lineWidth = Math.ceil(this.radius / 10);
        Entity.laws.ctx.beginPath();
        Entity.laws.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        Entity.laws.ctx.stroke();
        Entity.laws.ctx.fill();
        Entity.laws.ctx.restore();
    }
}
Entity.laws = { collisionType: "bounce", gravitationalConstant: 1 };
export { Entity, Vector2 };
