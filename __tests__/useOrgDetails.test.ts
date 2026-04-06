
import useOrgDetails from '../hooks/use-org-details';

jest.mock('@clerk/clerk-expo', () => ({ useUser: jest.fn() }));
import { useUser } from '@clerk/clerk-expo';

describe('useOrgDetails', () => {
  test('returns org data', () => {
    useUser.mockReturnValue({
      isLoaded: true,
      user: {
        organizationMemberships: [{
          organization: { name:'Org', imageUrl:'logo', id:'1'}
        }]
      }
    });
    const res = useOrgDetails();
    expect(res.name).toBe('Org');
  });
});
