export default function AddressInputs({ addressProps, setAddressProps }) {
  const { phone, streetAddress, city, postalCode, country } = addressProps

  return (
    <>
      <label>Phone Number</label>
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(ev) => setAddressProps('phone', ev.target.value)}
      />
      <label>Street Address</label>
      <input
        type="text"
        placeholder="Street Address"
        value={streetAddress}
        onChange={(ev) => setAddressProps('streetAddress', ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProps('city', ev.target.value)}
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(ev) => setAddressProps('postalCode', ev.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(ev) => setAddressProps('country', ev.target.value)}
      />
    </>
  )
}
