import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

export let deliveryOptions = [{
   id: '1',
   deliveryDays: 7,
   priceCents: 0
}, {
   id: '2',
   deliveryDays: 3,
   priceCents: 499
}, {
   id: '3',
   deliveryDays: 1,
   priceCents: 999
}]


function isWeekend(day) {
   if (day === 'Saturday' || day === 'Sunday')
      return true;
   return false;
}
export function calculateDeliveryDate(deliveryOption, today = dayjs(), deliveryDays = deliveryOption.deliveryDays, dayType = 'dddd, MMMM D') {
   // console.log (today);
   // console.log (deliveryDays);
   for (let i = 1; i <= deliveryDays; i++) {
      if (isWeekend(today.add(i, 'days').format('dddd')))
         deliveryDays++;
   }
   let deliveryDate = today.add(deliveryDays, 'days');
   if (dayType === 'returndeliveryDate')
      return deliveryDate;
   let dateString = deliveryDate.format(dayType);
   return dateString;
}
export function getDeliveryOption(givenId) {
   return deliveryOptions.find(deliveryOption => deliveryOption.id === givenId);
}