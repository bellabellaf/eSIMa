import { describe, it, expect, beforeEach } from "vitest"

const mockTelcoRegistry = {
  admin: "ST000000000000000000002AMW42H", // Genesis address
  telcos: new Map(),

  isAdmin(caller: string) {
    return caller === this.admin
  },

  registerTelco(caller: string, name: string, country: string, website: string, publicKey: string) {
    if (this.telcos.has(caller)) {
      return { error: 101 }
    }

    this.telcos.set(caller, {
      verified: false,
      name,
      country,
      website,
      publicKey
    })
    return { value: true }
  },

  verifyTelco(caller: string, telco: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    const entry = this.telcos.get(telco)
    if (!entry) return { error: 102 }
    if (entry.verified) return { error: 103 }

    this.telcos.set(telco, { ...entry, verified: true })
    return { value: true }
  },

  updateTelco(caller: string, name: string, country: string, website: string) {
    const entry = this.telcos.get(caller)
    if (!entry) return { error: 102 }

    this.telcos.set(caller, { ...entry, name, country, website })
    return { value: true }
  },

  removeTelco(caller: string, telco: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    if (!this.telcos.has(telco)) return { error: 102 }

    this.telcos.delete(telco)
    return { value: true }
  },

  getTelco(telco: string) {
    const entry = this.telcos.get(telco)
    return entry ? { value: entry } : { error: 102 }
  },

  transferAdmin(caller: string, newAdmin: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    this.admin = newAdmin
    return { value: true }
  },
}

describe("Telco Registry Contract", () => {
  const admin = "ST000000000000000000002AMW42H"
  const telco = "STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6"
  const other = "ST2C6JS2B5E7FRC8YEK8E7DJMSFW63Q8KZ56G9VXR"

  beforeEach(() => {
    mockTelcoRegistry.admin = admin
    mockTelcoRegistry.telcos = new Map()
  })

  it("should register a new telco", () => {
    const result = mockTelcoRegistry.registerTelco(
      telco, "Orange", "France", "https://orange.com", "abcd1234"
    )
    expect(result).toEqual({ value: true })
  })

  it("should not register the same telco twice", () => {
    mockTelcoRegistry.registerTelco(telco, "Orange", "France", "https://orange.com", "abcd1234")
    const result = mockTelcoRegistry.registerTelco(telco, "Orange", "France", "https://orange.com", "abcd1234")
    expect(result).toEqual({ error: 101 })
  })

  it("should verify a telco (admin only)", () => {
    mockTelcoRegistry.registerTelco(telco, "MTN", "Nigeria", "https://mtn.com", "pk001")
    const result = mockTelcoRegistry.verifyTelco(admin, telco)
    expect(result).toEqual({ value: true })
    expect(mockTelcoRegistry.telcos.get(telco)?.verified).toBe(true)
  })

  it("should reject verification by non-admin", () => {
    mockTelcoRegistry.registerTelco(telco, "MTN", "Nigeria", "https://mtn.com", "pk001")
    const result = mockTelcoRegistry.verifyTelco(other, telco)
    expect(result).toEqual({ error: 100 })
  })

  it("should update telco metadata", () => {
    mockTelcoRegistry.registerTelco(telco, "Vodafone", "UK", "https://vodafone.com", "pk002")
    const result = mockTelcoRegistry.updateTelco(telco, "Vodafone UK", "UK", "https://uk.vodafone.com")
    expect(result).toEqual({ value: true })
    expect(mockTelcoRegistry.telcos.get(telco)?.name).toBe("Vodafone UK")
  })

  it("should remove a telco (admin only)", () => {
    mockTelcoRegistry.registerTelco(telco, "Telia", "Sweden", "https://telia.com", "pk003")
    const result = mockTelcoRegistry.removeTelco(admin, telco)
    expect(result).toEqual({ value: true })
    expect(mockTelcoRegistry.telcos.has(telco)).toBe(false)
  })

  it("should transfer admin rights", () => {
    const result = mockTelcoRegistry.transferAdmin(admin, other)
    expect(result).toEqual({ value: true })
    expect(mockTelcoRegistry.admin).toBe(other)
  })
})
