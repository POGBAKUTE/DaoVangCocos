export namespace App {
    export function formatMoney(money: any): string {
        money = Number(money);
        if (isNaN(money)) return "";

        let sign = '';
        if (money < 0) {
            sign = '-';
            money = -money;
        }

        // Sử dụng Intl.NumberFormat để định dạng số tiền
        const formattedMoney = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(money);

        return sign + formattedMoney;
    }
}