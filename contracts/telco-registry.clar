;; Telco Registry Contract for eSIMa
;; SPDX-License-Identifier: MIT

(define-data-var admin principal tx-sender)

(define-map telcos principal {
  verified: bool,
  name: (string-utf8 64),
  country: (string-utf8 32),
  website: (string-utf8 128),
  public-key: (buff 32)
})

;; Error Codes
(define-constant ERR-NOT-AUTHORIZED u100)
(define-constant ERR-ALREADY-REGISTERED u101)
(define-constant ERR-NOT-REGISTERED u102)
(define-constant ERR-ALREADY_VERIFIED u103)

;; Check if sender is admin
(define-private (is-admin)
  (is-eq tx-sender (var-get admin))
)

;; Public: Register a telecom provider
(define-public (register-telco (name (string-utf8 64)) (country (string-utf8 32)) (website (string-utf8 128)) (public-key (buff 32)))
  (begin
    (asserts! (is-none (map-get? telcos tx-sender)) (err ERR-ALREADY-REGISTERED))
    (map-set telcos tx-sender {
      verified: false,
      name: name,
      country: country,
      website: website,
      public-key: public-key
    })
    (ok true)
  )
)

;; Public: Verify a telco (admin only)
(define-public (verify-telco (telco principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (let ((telco-data (map-get? telcos telco)))
      (match telco-data
        data
        (begin
          (asserts! (not (get verified data)) (err ERR-ALREADY_VERIFIED))
          (map-set telcos telco (merge data { verified: true }))
          (ok true)
        )
        (err ERR-NOT-REGISTERED)
      )
    )
  )
)

;; Public: Update telco metadata
(define-public (update-telco (name (string-utf8 64)) (country (string-utf8 32)) (website (string-utf8 128)))
  (let ((telco-data (map-get? telcos tx-sender)))
    (match telco-data
      data
      (begin
        (map-set telcos tx-sender (merge data {
          name: name,
          country: country,
          website: website
        }))
        (ok true)
      )
      (err ERR-NOT-REGISTERED)
    )
  )
)

;; Public: Remove a telco (admin only)
(define-public (remove-telco (telco principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (asserts! (is-some (map-get? telcos telco)) (err ERR-NOT-REGISTERED))
    (map-delete telcos telco)
    (ok true)
  )
)

;; Read-only: Get telco metadata
(define-read-only (get-telco (telco principal))
  (match (map-get? telcos telco)
    telco-data (ok telco-data)
    (err ERR-NOT-REGISTERED)
  )
)

;; Public: Transfer admin rights
(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (var-set admin new-admin)
    (ok true)
  )
)
