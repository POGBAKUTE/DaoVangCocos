import { _decorator, Component, Node, Vec3, tween, Canvas, instantiate, UITransform } from 'cc';
const { ccclass, property } = _decorator;
export namespace GateUtils{
    export function flyRewardAnimation(
        {
            currentNode,
            prefab,
            amount = 3,
            targetNode,
            timeFactor = 0.5,
            spread = 100,
            highestY = 500,
            directCurve = 1,
            isRocket = false,
        },
        callback?: Function,
        callbackAudio?: Function,
    ) {
        let currentQueue: Node[] = [];
        let completedAnimations: number = 0;
        let canvas = findCanvas(currentNode);

        for (let i = 0; i < amount; i++) {
            var item = instantiate(prefab);
            item.setParent(canvas.node);
            item.active = true;
            currentQueue.push(item);
        }
        for (let i = 0; i < currentQueue.length; i++) {
            // if (currentQueue.length > 0) {
            let reward = currentQueue[i];
            reward.active = true;
            let randomX = Math.random() * (spread * 2) - spread;
            let randomY = Math.random() * (spread * 2) - spread;

            //lay vi tri thang hien tai va tan no ra xung quanh

            //position of target
            let canvasPosition = targetNode
            let worldPositionCurrent = currentNode.getWorldPosition()
            let currentNodeCanvasPos = canvas
                .getComponent(UITransform)
                .convertToNodeSpaceAR(worldPositionCurrent);

            // Tính toán các điểm trên đường cong
            let points: Vec3[] = [];
            points.push(
                new Vec3(
                    currentNodeCanvasPos.x + randomX,
                    currentNodeCanvasPos.y + randomY,
                    currentNodeCanvasPos.z
                )
            );
            // Điểm bắt đầu
            // let centerPoint = currentNodeCanvasPos.add(canvasPosition).multiplyScalar(0.5);
            // points.push(
            //     centerPoint
            // );
            const midPoint = new Vec3(
                (currentNodeCanvasPos.x + canvasPosition.x) / 2,
                (currentNodeCanvasPos.y + canvasPosition.y) / 2,
                0
            );
            //vector chỉ phương (y2-y1, -(x2-x1))
            const n = new Vec3(
                currentNodeCanvasPos.y - canvasPosition.y,
                canvasPosition.x - currentNodeCanvasPos.x,
                0
            );
            n.normalize().multiplyScalar(directCurve);
            const newPoint = midPoint.add(n.multiplyScalar(highestY));
            points.push(new Vec3(newPoint));
            points.push(new Vec3(canvasPosition)); // Điểm đích đến
            // let duration = (i + 1) * timeFactor; // Thời gian di chuyển giữa mỗi điểm
            tween(reward)
                .to(0, {
                    position: new Vec3(
                        currentNodeCanvasPos.x,
                        currentNodeCanvasPos.y,
                        currentNodeCanvasPos.z
                    ),
                })
                .to(0.3, { position: points[0] })
                .delay(timeFactor * (i + 1))
                .call(() => {
                    if(i === 0 && callbackAudio) {
                        callbackAudio();
                    }
                })
                .to(
                    !isRocket ? 0.5 : 1.2,
                    {},
                    {
                        onUpdate: (target: Node, ratio) => {
                            let pos = calculateQuadraticBezierPoint(
                                ratio,
                                points[0],
                                points[1],
                                points[2]
                            );
                            target.setPosition(pos.x, pos.y, pos.z);
                            let scale = 1 - ratio;
                            if (!isRocket)
                                target.setScale(new Vec3(scale, scale, scale));
                        },
                    }
                )
                .call(() => {
                    // Cập nhật số lượng animations hoàn thành
                    completedAnimations++;
                    if (completedAnimations == 1 && callback) {
                        callback();
                    }
                })
                .destroySelf()
                .start();
            if (isRocket) {
                let beginAngle = caculateAngle(points[0], points[1]) - 90;
                let endAngle = caculateAngle(points[1], points[2]) - 90;
                tween(reward)
                    .to(0.5, {
                        angle: beginAngle,
                    })
                    .delay(timeFactor * (i + 1))
                    .to(
                        0.5,
                        {
                            angle: endAngle,
                        },
                        { easing: "quadOutIn" }
                    )
                    .start();
                tween(reward)
                    .delay(timeFactor * (i + 1) + 0.5)
                    .to(0.5, {
                        scale: new Vec3(0.4, 0.4, 0.4),
                    })
                    .start();
            }
        }
    }

    function caculateAngle(pointA: Vec3, pointB: Vec3) {
        const vectorAB: Vec3 = pointB
            .clone()
            .add(new Vec3(-pointA.x, -pointA.y, -pointA.z));
        const vectorABLength: number = vectorAB.length();
        const angleRadians: number = Math.atan2(vectorAB.y, vectorAB.x);
        const angleDegrees: number = (180 / Math.PI) * angleRadians;

        let adjustedAngleDegrees: number = angleDegrees;

        if (angleDegrees < 0) {
            adjustedAngleDegrees += 360;
        } else if (angleDegrees >= 360) {
            adjustedAngleDegrees -= 360;
        }
        return adjustedAngleDegrees;
    }

    function calculateQuadraticBezierPoint(t, p0, p1, p2) {
        const x =
            (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
        const y =
            (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
        return new Vec3(x, y, 0);
    }

    function findCanvas(node) {
        if (!node) return null;
        // Kiểm tra nếu nút hiện tại là Canvas
        if (node.getComponent(Canvas)) {
            return node.getComponent(Canvas);
        }
        // Nếu không, đi lên nút cha và tìm tiếp
        return findCanvas(node.parent);
    }
}


