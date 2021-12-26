interface Vector2 {
    x: number,
    y: number
}

class Vector2 {

    constructor(a: number | Vector2, b?: number){
        if(typeof a === "object"){
            this.x = a.x;
            this.y = a.y;
        }else if(b !== undefined){
            this.x = a;
            this.y = b;
        }else {
            this.x = 0;
            this.y = 0;
        }
    }

    add(a: number | Vector2, b?: number): Vector2{

        let r = new Vector2(this.x, this.y);

        if(typeof a === "object"){
            r.x += a.x;
            r.y += a.y;
        }else if(b !== undefined){
            r.x += a;
            r.y += b;
        }

        return r;
    }

    negate(): Vector2{
        return new Vector2(-this.x, -this.y);
    }


    subtractThisFrom(a: Vector2 | number, b?: number): Vector2{
        return this.negate().add(a, b);
    }

    multiplyBy(factor: number): Vector2{
        return new Vector2(this.x * factor, this.y * factor);
    }
}

interface Entity {
    uuid: string,
    position: Vector2,
    mass: number,
    radius: number,
    velocity: Vector2,
    color: Color,
    borderColor: Color
}
interface PhysicsLaws {
    collisionType: collisionType,
    gravitationalConstant: number,
    ctx?: CanvasRenderingContext2D,
    canvas?: HTMLCanvasElement
}
interface Color {
    red: number,
    green: number,
    blue: number
}

type collisionType = "merge" | "bounce";

const entityList: Array<Entity> = [];

class Entity {
    static laws: PhysicsLaws = {collisionType: "bounce", gravitationalConstant: 1};

    static modifyLaws(newLaws: Partial<PhysicsLaws>): void{
        this.laws = {...this.laws, ...newLaws};
    }

    constructor(position: Vector2, mass: number, radius: number, velocity?: Vector2) {
        // @ts-ignore
        this.uuid = crypto.randomUUID();
        entityList.push(this);

        if(velocity === undefined){
            this.velocity = new Vector2(0, 0);
        }else {
            this.velocity = new Vector2(velocity);
        }

        this.position = position;
        this.mass = mass;
        this.radius = radius;

        this.color = {red: 0, green: 0, blue: 0};
        this.borderColor = {red: 0, green: 0, blue: 0};
    }

    setColor(color: Partial<Color>){
        this.color = {...this.color, ...color};
    }

    setBorder(color: Partial<Color>){
        this.borderColor = {...this.borderColor, ...color};
    }

    get colorString(): string{
        return `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
    }

    get borderColorString(): string{
        return `rgb(${this.borderColor.red}, ${this.borderColor.green}, ${this.borderColor.blue})`;
    }

    update(): void{

    }

    draw(): void{

        if(Entity.laws.ctx === undefined){
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


export {Entity, Vector2};