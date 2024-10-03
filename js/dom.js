let donationHistory = [];

        // Function to get the current date and time in Dhaka timezone
        function getCurrentDateTime() {
            const now = new Date();
            return now.toLocaleString('en-GB', {
                timeZone: 'Asia/Dhaka',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        }

        // Donation logic when clicking "Donate Now"
        function setupDonationHandlers() {
            const carts = document.querySelectorAll('.cart');  
            
            carts.forEach((cart, index) => {
                const donateNowButton = cart.querySelector('.donetion-btn'); 
                const donationAmountInput = cart.querySelector('.donation-amount'); 
                const donatedAmountElement = cart.querySelector('.donated-amount'); 

                donateNowButton.addEventListener('click', function () {
                const availableBalanceElement = document.getElementById('availableBalance');
                let availableBalance = parseFloat(availableBalanceElement.innerText);

                let donationAmount = parseFloat(donationAmountInput.value);
                let donatedAmount = parseFloat(donatedAmountElement.innerText);

                if (!isNaN(donationAmount) && donationAmount > 0 && donationAmount <= availableBalance) {
                    donatedAmount += donationAmount;
                    availableBalance -= donationAmount;

                    // Update the displayed values
                    donatedAmountElement.innerText = donatedAmount;
                    availableBalanceElement.innerText = availableBalance;
                    donationAmountInput.value = '';

                    // Get the title/cause from the current cart
                    let cause = cart.querySelector('span').innerText;

                    // Add donation to history with the cause and full date
                    donationHistory.push({
                        amount: donationAmount,
                        cause: cause,
                        date: new Date().toString()
                    });

                   
                    localStorage.setItem('donationHistory', JSON.stringify(donationHistory));
    
                    const modalId = `confirmationModal${index + 1}`;
                    document.getElementById(modalId).checked = true;
                } else {
                    alert('Please enter a valid donation amount that does not exceed the available balance.');
                }
            });

            });
        }

        // Function to show donation section and hide history section
        function showDonation() {
            document.getElementById('donationSection').style.display = 'block'; // Show Donation
            document.getElementById('historySection').style.display = 'none'; // Hide History

            document.getElementById('donationButton').classList.add('active-btn');
            document.getElementById('donationButton').classList.remove('inactive-btn');
            document.getElementById('historyButton').classList.add('inactive-btn');
            document.getElementById('historyButton').classList.remove('active-btn');
        }

    // Function to show history section and hide donation section
    function showHistory() {
    document.getElementById('donationSection').style.display = 'none'; // Hide Donation
    document.getElementById('historySection').style.display = 'block'; // Show History

    
    document.getElementById('historyButton').classList.add('active-btn');
    document.getElementById('historyButton').classList.remove('inactive-btn');
    document.getElementById('donationButton').classList.add('inactive-btn');
    document.getElementById('donationButton').classList.remove('active-btn');

    
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = ''; 

    // Check if there is any donation history
    if (donationHistory.length > 0) {
        donationHistory.forEach(function (record) {
            
            const historyCard = document.createElement('div');
            historyCard.classList.add('cart', 'max-w-5xl', 'mx-auto', 'mb-6', 'border', 'rounded-md', 'p-4');
            
            historyCard.innerHTML = `
                <h4 class="text-xl font-bold py-2">${record.amount} BDT Donated for ${record.cause}</h4>
                <p class="text-sm text-gray-500">Date: ${record.date}</p>
            `;

           
            historyContainer.appendChild(historyCard);
        });
    } else {
        historyContainer.innerHTML = '<p>No donation history available.</p>';
    }
}


        // Clear history on page refresh
        window.onload = function () {
            
            localStorage.clear();

            donationHistory = [];

            showDonation();
            setupDonationHandlers();
        };

        document.getElementById('donationButton').addEventListener('click', showDonation);
        document.getElementById('historyButton').addEventListener('click', showHistory);
