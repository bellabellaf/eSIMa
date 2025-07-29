# eSIMa — Decentralized Mobile Network Marketplace

A blockchain-based platform enabling decentralized telecom access, eSIM provisioning, data resale, and automated roaming agreements through Clarity smart contracts.

---

## **Overview**

eSIMa empowers users and telecom providers to interact directly on a transparent, trustless platform. The system is composed of ten smart contracts that handle identity, payments, usage metering, eSIM activation, and governance.

---

## **Smart Contract Modules**

1. **Telco Registry Contract** – Manages verified telecom provider onboarding and metadata  
2. **User Identity Manager** – Handles KYC-linked decentralized identity and eSIM mapping  
3. **Data Plan Marketplace** – Lists mobile plans for purchase or subscription  
4. **Roaming Agreement Contract** – Automates inter-telco roaming contracts and settlements  
5. **Usage Metering Oracle Contract** – Verifies mobile data usage and service quality via oracles  
6. **Payment Escrow Contract** – Holds funds for data plans and releases upon usage confirmation  
7. **Reputation System Contract** – Tracks service quality ratings for telcos and users  
8. **Data Resale Contract** – Enables peer-to-peer resale of unused mobile data  
9. **eSIM Provisioning Contract** – Issues blockchain-linked eSIM activation credentials  
10. **Governance DAO Contract** – Manages protocol rules, parameters, and dispute resolutions

---

## **Features**

- Decentralized telecom marketplace  
- On-chain identity and eSIM provisioning  
- Borderless mobile data access  
- Smart roaming agreements  
- Usage-based metering and payments  
- Peer-to-peer data resale  
- Transparent reputation system  
- DAO-based governance and dispute resolution

---

## **Smart Contracts**

### **Telco Registry Contract**
- Onboards verified telecom providers  
- Stores public keys, coverage areas, and offered services  

### **User Identity Manager**
- Issues blockchain-based DIDs  
- Links user wallets to identity and eSIM credentials  

### **Data Plan Marketplace**
- Lists prepaid/postpaid plans  
- Enables subscriptions, top-ups, and plan switching  

### **Roaming Agreement Contract**
- Defines terms between partnered telcos  
- Automates usage metering and profit sharing  

### **Usage Metering Oracle Contract**
- Integrates external APIs to verify mobile usage  
- Ensures quality-of-service tracking and accountability  

### **Payment Escrow Contract**
- Locks user funds during plan usage  
- Supports partial refunds, auto-release, and disputes  

### **Reputation System Contract**
- Aggregates user and provider reviews  
- Influences visibility and DAO incentives  

### **Data Resale Contract**
- Facilitates resale of unused data quotas  
- Ensures fair pricing and expiry tracking  

### **eSIM Provisioning Contract**
- Issues unique activation tokens  
- Coordinates off-chain eSIM deployment securely  

### **Governance DAO Contract**
- Manages protocol upgrades, rule changes  
- Handles complaints, voting, and dispute resolutions  

---

## **Installation**

1. Install Clarinet CLI  
2. Clone this repository  
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Run tests:
    ```bash
    npm run test
    ```

## Usage

Each contract is modular and can be deployed independently. Refer to each contract’s documentation in the /contracts directory for deployment steps, function details, and integration notes.


## License

MIT License

