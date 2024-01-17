const payWithMetamaskButton = document.getElementById('payWithMetamask');

payWithMetamaskButton.addEventListener('click', () => {
    if (typeof window.ethereum !== 'undefined') {
        payWithMetamask();
    } else {
        alert('Lütfen Metamask yükleyin!');
    }
});

async function payWithMetamask() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const transactionParameters = {
            nonce: '0x00', // Özelleştirilebilir
            to: '0xAlıcıAdresi', // Alıcı adresi
            from: account,
            value: '0xMiktar', // Hexadecimal olarak gönderilecek miktar (wei cinsinden)
            gasPrice: '0x09184e72a000', // Özelleştirilebilir
            gas: '0x2710', // Özelleştirilebilir
        };
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        console.log('İşlem Hash:', txHash);

        // PHP backend'e işlem hash'ini gönder
        fetch('process-payment.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ txHash: txHash }),
        });
    } catch (error) {
        console.error(error);
    }
}
