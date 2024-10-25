
(async function fetchData() {
   try {
      let response = await fetch('https://supersimplebackend.dev/greeting', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         }
      });
      if (response.status >= 400)
         throw response;
      let data = await response.text();
      console.log(data);
   } catch (response) {
      if (response.status === 400) {
         let message = await response.json();
         console.log(message);
      }
      else {
         console.log('Network error. Please try again later.')
      }
   }

})();