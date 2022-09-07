import { formatDate } from '@/helper/date'

describe('test format date', () => {
  it('test format day', () => {
    const result = formatDate(new Date(1662532039490), null, null, null, true)

    expect(result).toBe('Wed')
  })

  it('test format full day', () => {
    const result = formatDate(new Date(1662532039490), null, null, null, true, true, true, true)

    expect(result).toBe('Wed 07/09/2022')
  })
})
