const { shopifyApi } = require('@shopify/shopify-api');
const crypto = require('crypto');
 
const shopify = shopifyApi({
    // The next 4 values are typically read from environment variables for added security
    apiKey: 'APIKeyFromPartnersDashboard',
    apiSecretKey: 'APISecretFromPartnersDashboard',
    scopes: ['read_products'],
    hostName: 'ngrok-tunnel-address',
      });
function decrypt(key, encryptedPayload) {
   const encryptedMessage = Buffer.from(encryptedPayload.encrypted_message, 'base64');
  const tag = Buffer.from(encryptedPayload.tag, 'base64');

   const ephemeralPublicKeyPem = encryptedPayload.ephemeral_public_key;
  const ephemeralPublicKey = crypto.createPublicKey({ key: ephemeralPublicKeyPem, format: 'pem' });
  const sharedSecret = crypto.diffieHellmanComputeSecret(key, ephemeralPublicKey);

   const cipher = crypto.createCipheriv('aes-256-ctr', sharedSecret, Buffer.alloc(16, 0));
  const macDigest = crypto.createHash('sha256');
  const macLength = macDigest.digest().length / 2;
  const keyPair = crypto.pbkdf2Sync(
    sharedSecret,
    '',
    1,
    cipher.keySize + macLength,
    'sha256'
  );
  const cipherKey = keyPair.slice(0, cipher.keySize);
  const hmacKey = keyPair.slice(-macLength);
  const computedMac = crypto.createHmac('sha256', hmacKey)
    .update(encryptedMessage)
    .digest()
    .slice(0, macLength);
  if (!crypto.timingSafeEqual(computedMac, tag)) {
    throw new Error('Invalid Message Authenticaton Code');
  }
  let decrypted = cipher.update(encryptedMessage);
  decrypted += cipher.final();
  return decrypted;
}
const samplecard = {
    "type": "card",
    "full_name": "Percy Parker",
    "pan": "4242424242424242",
    "month": 12,
    "year": 2033,
    "verification_value": "122"
  }
class ShopifyPayment{
    constructor(orderid,user,card){
        this.orderid = orderid;
        this.user = user
    }
    async create_order(){
        this.email = this.user.email;
        const order = new shopify.rest.Order({session: session});
        order.email = this.email
        order.fulfillment_status = "fulfilled";
        order.fulfillments = [
        {
            "location_id": 24826418
        }
        ];
        order.line_items = [
        {
            "variant_id": this.orderid,
            "quantity": 1
        }
        ];
        const res = await order.save({
        update: true,
        });
        this.checkout_id = res.order.checkout_id
        this.amount = res.order.current_subtotal_price
    }

    async  processPayment(cardDetails, itemInfo) {
        try {
           const customer = await shopify.customer.create({
            email: cardDetails.email,
            firstName: cardDetails.firstName,
            lastName: cardDetails.lastName,
            addresses: [{
              address1: cardDetails.address1,
              address2: cardDetails.address2,
              city: cardDetails.city,
              province: cardDetails.province,
              zip: cardDetails.zip,
              country: cardDetails.country
            }],
            phone: cardDetails.phone
          });
      
           const order = await shopify.order.create({
            customerId: customer.id,
            lineItems: [{
              title: itemInfo.title,
              variantId: itemInfo.variantId,
              quantity: itemInfo.quantity
            }]
          });
      
           const payment = await shopify.payment.create(order.id, {
            payment: {
              creditCard: {
                number: cardDetails.cardNumber,
                month: cardDetails.expMonth,
                year: cardDetails.expYear,
                verificationValue: cardDetails.cvv
              }
            }
          });
      
          // Return the payment result
          return payment;
        } catch (error) {
          console.error('Error processing payment:', error);
          throw error;
        }
      }
      
 
      

    
}