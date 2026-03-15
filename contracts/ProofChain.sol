// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProofChain {
    struct Certificate {
        string hash;
        string recipient;
        string issuer;
        string eventName;
        string date;
        string ipfsUrl;
        bool exists;
    }

    mapping(string => Certificate) private certificates;

    event CertificateIssued(string indexed hash, string recipient, string issuer);

    function issueCertificate(
        string memory _hash,
        string memory _recipient,
        string memory _issuer,
        string memory _eventName,
        string memory _date,
        string memory _ipfsUrl
    ) public {
        require(!certificates[_hash].exists, "Certificate already exists");
        certificates[_hash] = Certificate(_hash, _recipient, _issuer, _eventName, _date, _ipfsUrl, true);
        emit CertificateIssued(_hash, _recipient, _issuer);
    }

    function verifyCertificate(string memory _hash)
        public
        view
        returns (
            string memory hash,
            string memory recipient,
            string memory issuer,
            string memory eventName,
            string memory date,
            string memory ipfsUrl,
            bool exists
        )
    {
        Certificate memory cert = certificates[_hash];
        return (cert.hash, cert.recipient, cert.issuer, cert.eventName, cert.date, cert.ipfsUrl, cert.exists);
    }
}
