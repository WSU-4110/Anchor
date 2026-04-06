import {
  createBusinessHandler,
  updateBusinessHandler,
  queryBusinessWithIdHandler,
  queryBusinessesHandler,
} from "@/convex/businesses";

const createMockCtx = () => {
  const mockUnique = jest.fn();
  const mockCollect = jest.fn();
  const mockFilter = jest.fn(() => ({ unique: mockUnique }));
  const mockWithIndex = jest.fn(() => ({ filter: mockFilter }));
  const mockQuery = jest.fn(() => ({
    withIndex: mockWithIndex,
    collect: mockCollect,
  }));
  const mockInsert = jest.fn();
  const mockPatch = jest.fn();

  return {
    ctx: {
      db: {
        insert: mockInsert,
        query: mockQuery,
        patch: mockPatch,
      },
    },
    mocks: {
      mockInsert,
      mockQuery,
      mockPatch,
      mockWithIndex,
      mockFilter,
      mockUnique,
      mockCollect,
    },
  };
};

//describe("stuff", () => {});

describe("Business mutations and queries", () => {    

  describe("createBusiness", () => {
    it("inserts a business and returns the new id", async () => {
      const { ctx, mocks } = createMockCtx();
      const fakeId = "fake-id-123";
      mocks.mockInsert.mockResolvedValue(fakeId);

			const args = {
				businessName: "Test Name",
        businessLocation: "Detroit, MI",
        businessId: "business-001",
        created_by: "user-001",
      };

      const result = await createBusinessHandler(ctx, args);

      expect(mocks.mockInsert).toHaveBeenCalledWith("businesses", {
        businessName: "Test Name",
        businessId: "business-001",
        businessLocation: "Detroit, MI",
        created_by: "user-001",
      });
      expect(result).toBe(fakeId);
    });

    it("propagates db errors", async () => {
      const { ctx, mocks } = createMockCtx();
      mocks.mockInsert.mockRejectedValue(new Error("DB insert failed"));

        await expect(
        createBusinessHandler(ctx, {
          businessName: "Test Name",
          businessLocation: "Detroit, MI",
          businessId: "business-001",
          created_by: "user-001",
        })
        ).rejects.toThrow("DB insert failed");
    });
	});

	describe("updateBusiness", () => {
		const args = {
			businessName: "Test Name",
			businessLocation: "Detroit, MI",
			businessId: "business-001",
			created_by: "user-001",
			businessLogo: "https://example.com/logo.png",
		};

		it("patches the business when the owner matches", async () => {
			const { ctx, mocks } = createMockCtx();
			const fakeBusiness = { _id: "id-999", created_by: "user-001" };
			mocks.mockUnique.mockResolvedValue(fakeBusiness);

			await updateBusinessHandler(ctx, args);

			expect(mocks.mockPatch).toHaveBeenCalledWith("id-999", {
				businessName: "Test Name",
				businessLocation: "Detroit, MI",
				businessLogo: "https://example.com/logo.png",
			});
		});

		it("does NOT patch when no business is found", async () => {
			const { ctx, mocks } = createMockCtx();
			mocks.mockUnique.mockResolvedValue(null);

			await updateBusinessHandler(ctx, args);

			expect(mocks.mockPatch).not.toHaveBeenCalled();
		});
	});

	describe("queryBusinessWithId", () => {
		it("returns the business when userId matches created_by", async () => {
			const { ctx, mocks } = createMockCtx();
			const fakeBusiness = {
				_id: "id-1",
				created_by: "user-001",
				businessName: "Test Name",
			};
			mocks.mockUnique.mockResolvedValue(fakeBusiness);

			const result = await queryBusinessWithIdHandler(ctx, {
				userId: "user-001",
			});

			expect(mocks.mockQuery).toHaveBeenCalledWith("businesses");
			expect(mocks.mockWithIndex).toHaveBeenCalledWith("created_by");
			expect(result).toEqual(fakeBusiness);
  	});

		it("returns undefined when no business is found", async () => {
			const { ctx, mocks } = createMockCtx();
			mocks.mockUnique.mockResolvedValue(null);

			const result = await queryBusinessWithIdHandler(ctx, {
				userId: "user-001",
			});

			expect(result).toBeUndefined();
  	});
	});

	describe("queryBusinesses", () => {
		it("returns all businesses", async () => {
			const { ctx, mocks } = createMockCtx();
			const fakeBusinesses = [
				{ _id: "1", businessName: "Name 1" },
				{ _id: "2", businessName: "Name 2" },
			];
			mocks.mockCollect.mockResolvedValue(fakeBusinesses);

			const result = await queryBusinessesHandler(ctx, {});

			expect(mocks.mockQuery).toHaveBeenCalledWith("businesses");
			expect(mocks.mockCollect).toHaveBeenCalled();
			expect(result).toEqual(fakeBusinesses);
  	});
	});

	
});