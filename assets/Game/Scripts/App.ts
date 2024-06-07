import { js } from "cc";

export namespace App {
    export function formatMoney(money: any): string {
        money = Number(money);
        if (!js.isNumber(money)) return "";

        let sign = ''
        if (money < 0) {
            sign = '-'
            money = -money
        }


        var strValue = money.toString();
        var pos = strValue.length - 3;
        while (pos > 0) {
            strValue = [strValue.slice(0, pos), ".", strValue.slice(pos)].join(
                ""
            );
            pos -= 3;
        }
        return sign + strValue;
    }
}