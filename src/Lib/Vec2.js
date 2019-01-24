const Vec2 = function(x, y) {
  this.x = x;
  this.y = y;
};

Vec2.prototype.length = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vec2.prototype.add = function(vec) {
  return new Vec2(vec.x + this.x, vec.y + this.y);
}

Vec2.prototype.subtract = function(vec) {
  return new Vec2(this.x - vec.x, this.y - vec.y);
}

Vec2.prototype.scale = function(n) {
  return new Vec2(this.x * n, this.y * n);
}

Vec2.prototype.dot = function(vec) {
  return this.x * vec.x + this.y * vec.y;
}

Vec2.prototype.cross = function(vec) {
  return this.x * vec.y - this.y * vec.x;
}

Vec2.prototype.rotate = function(center, angle) {
  const x = this.x - center.x;
  const y = this.y - center.y;
  return new Vec2(
    x * Math.cos(angle) - y * Math.sin(angle) + center.x,
    x * Math.sin(angle) + y * Math.cos(angle) + center.y
  );
}

Vec2.prototype.normalize = function(center, angle) {
  let len = this.length();
  if (len > 0) {
    len = 1 / len;
  }

  return new Vec2(this.x * len, this.y * len);
}

Vec2.prototype.distance = function(vec) {
  const x = this.x - vec.x;
  const y = this.y - vec.y;
  return Math.sqrt(x * x + y * y);
}

module.exports = Vec2;
