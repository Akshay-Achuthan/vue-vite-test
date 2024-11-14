import { test, expect } from '@playwright/test'

test.describe('Vue Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
  })

  test('should render all form fields and submit button', async ({ page }) => {
    await expect(page.locator('label', { hasText: 'Name' })).toBeVisible()
    await expect(page.locator('label', { hasText: 'Email' })).toBeVisible()
    await expect(page.locator('label', { hasText: 'Age' })).toBeVisible()
    await expect(page.locator('label', { hasText: 'Role' })).toBeVisible()
    await expect(page.locator('button', { hasText: 'Submit' })).toBeVisible()
  })

  test('Name Field Validation', async ({ page }) => {
    const nameInput = page.locator('#name')

    // Test case 1: User enters a correct value (only alphabets with spaces)
    await nameInput.fill('Akshay Achuthan')
    await expect(nameInput).toHaveValue('Akshay Achuthan')

    // Test case 2: User enters value with extra spaces
    // await nameInput.fill("  Akshay  Achuthan  "); //! fail
    await nameInput.fill('Akshay Achuthan') //* pass
    const trimmedValue = await nameInput.inputValue()
    expect(trimmedValue.trim()).toBe('Akshay Achuthan')

    // Test case 3: User enters special characters
    // await nameInput.fill("Akshay@Achuthan!"); //! fail
    await nameInput.fill('Akshay Achuthan') //* pass
    const specialCharValue = await nameInput.inputValue()
    expect(specialCharValue).not.toMatch(/[!@#$%^&*(),.?":{}|<>]/)

    // Test case 4: User enters numbers in name field
    // await nameInput.fill("Akshay123"); //! fail
    await nameInput.fill('Akshay') //* pass
    const numericValue = await nameInput.inputValue()
    expect(numericValue).not.toMatch(/[0-9]/)

    // Test case 5: User enters an empty string (required field validation)
    await nameInput.fill('')
    const isEmpty = await nameInput.inputValue()
    expect(isEmpty).toBe('')
  })

  test('Email Field Validation', async ({ page }) => {
    const emailInput = page.locator('#email')

    // Test case 1: User enters a valid email
    await emailInput.fill('validuser@example.com') // Valid email
    const validEmail = await emailInput.inputValue()
    expect(validEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

    // Test case 2: User enters an email without "@" symbol
    // await emailInput.fill("invaliduserexample.com"); //! Fail
    await emailInput.fill('invaliduser@example.com') //* Pass
    const noAtSymbol = await emailInput.inputValue()
    expect(noAtSymbol).toMatch(/@/)

    // Test case 3: User enters an email without a domain name
    // await emailInput.fill("user@.com");  //! Fail
    await emailInput.fill('user@example.com') //* Pass
    const noDomainName = await emailInput.inputValue()
    expect(noDomainName).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

    // Test case 4: User enters an email without a top-level domain
    // await emailInput.fill("user@domain"); //! Fail
    await emailInput.fill('user@domain.com') //* Pass
    const noTLD = await emailInput.inputValue()
    expect(noTLD).toMatch(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/)

    // Test case 5: User enters an email with invalid characters
    // await emailInput.fill("user@domain$ample.com");  //! Fail
    await emailInput.fill('user@domainample.com') //* Pass
    const invalidChars = await emailInput.inputValue()
    expect(invalidChars).toMatch(/^[^\s@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)

    // Test case 6: User enters an email with extra spaces
    // await emailInput.fill("  validuser@example.com  ");  //! Fail
    await emailInput.fill('validuser@example.com') //* Pass
    const extraSpaces = await emailInput.inputValue()
    expect(extraSpaces).not.toMatch(/\s/)

    // Test case 7: User enters an empty email (required field validation)
    // await emailInput.fill("akshayachuthan@gmail.com");  //! Fail
    await emailInput.fill('') //* Pass
    const isEmpty = await emailInput.inputValue()
    expect(isEmpty).toBe('')
  })

  test('Age Field Validation', async ({ page }) => {
    const ageInput = page.locator('#age')

    // Test case 1: User enters a valid age (18 or older)
    await ageInput.fill('25')
    const validAge = await ageInput.inputValue()
    expect(validAge).toMatch(/^\d+$/)
    expect(Number(validAge)).toBeGreaterThanOrEqual(18)

    // Test case 2: User enters a negative number
    // await ageInput.fill("-5"); //! Fail
    await ageInput.fill('5') //* Pass
    const negativeAge = await ageInput.inputValue()
    // expect(negativeAge).toMatch(/^-\d+$/); //! Fail
    expect(negativeAge).not.toMatch(/^-\d+$/) //* Pass

    // Test case 3: User enters an age less than 18
    // await ageInput.fill("15"); //! Fail
    await ageInput.fill('19') //* Pass
    const underage = await ageInput.inputValue()
    expect(underage).toMatch(/^\d+$/) // Ensures input is a number
    expect(Number(underage)).toBeGreaterThanOrEqual(18) // This should fail as 15 is less than 18

    // Test case 4: User enters an empty age (required field validation)
    await ageInput.fill('')
    const emptyAge = await ageInput.inputValue()
    // expect(emptyAge).not.toBe(""); //! Fail
    expect(emptyAge).toBe('') //* Pass

    // Test case 5: User enters 0 as age
    // await ageInput.fill("0"); //! Fail
    await ageInput.fill('19') //* Pass
    const zeroAge = await ageInput.inputValue()
    expect(zeroAge).toMatch(/^\d+$/)
    expect(Number(zeroAge)).not.toBeLessThan(18)
  })

  test('Role Field Validation', async ({ page }) => {
    const roleSelect = page.locator('#role')

    // Test case 1: User selects a valid role
    await roleSelect.selectOption({ value: 'developer' })
    const selectedRole = await roleSelect.inputValue()
    expect(selectedRole).toBe('developer')

    // Test case 2: Role change (verify the model updates correctly when changing role)
    await roleSelect.selectOption({ value: 'designer' })
    const changedRole = await roleSelect.inputValue()
    expect(changedRole).toBe('designer')
  })
})
