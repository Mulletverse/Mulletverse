import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Chain } from "web3uikit";
import NFTType from "../types/NFTType";

export type PortfolioProps = {
  dashboard: {
    data: NFTType[];
    isLoading: boolean;
    hasError: boolean;
    total: number;
    previousCursor: string[];
    nextCursor?: string;
    page: number;
  };
  collection: {
    data: NFTType[];
    isLoading: boolean;
    hasError: boolean;
    total: number;
    previousCursor: string[];
    nextCursor?: string;
    page: number;
  };
  wishlist: {
    data: NFTType[];
    isLoading: boolean;
    hasError: boolean;
    total: number;
    previousCursor: string[];
    nextCursor?: string;
    page: number;
  };
};

type GetNFTProps = {
  cursor?: string | null;
  limit: number;
  account: { getNFTs: Function };
};

type NFTResponse = {
  token_address: string;
  chain: Chain;
  token_id: string;
  name: string;
  metadata: string;
};

const initialState: PortfolioProps = {
  dashboard: { data: [], hasError: false, isLoading: false, total: 0, nextCursor: "", previousCursor: [""], page: 0 },
  collection: { data: [], hasError: false, isLoading: false, total: 0, nextCursor: "", previousCursor: [""], page: 0 },
  wishlist: { data: [], hasError: false, isLoading: false, total: 0, nextCursor: "", previousCursor: [""], page: 0 },
};

const getNFTList = (list: NFTResponse[]): NFTType[] =>
  list?.map((data: NFTResponse) => ({
    address: data.token_address,
    chain: data.chain,
    tokenId: data.token_id,
    fetchMetadata: false,
    name: data.name,
    metadata: JSON.parse(data.metadata),
  })) || [];

export const getDashboardNFTs = createAsyncThunk("portfolio/GET_DASHBOARD_NFT", async (data: GetNFTProps) => {
  const address = "0x4F5beD793202f22d17CDC3d6eBe538c07A474126";
  const chain = "eth";
  const limit = data.limit;
  const response = await data.account.getNFTs({ address, chain, limit, cursor: data.cursor });
  const nftList: NFTType[] = getNFTList(response.result);
  return {
    data: nftList,
    previousCursor: data.cursor,
    nextCursor: response.cursor,
    total: response.total,
    page: response.page,
  };
});

export const getCollectionNFTs = createAsyncThunk("portfolio/GET_COLLECTION_NFT", async (data: GetNFTProps) => {
  const address = "0xd45058Bf25BBD8F586124C479D384c8C708CE23A";
  const chain = "eth";
  const limit = data.limit;
  const response = await data.account.getNFTs({ address, chain, limit, cursor: data.cursor });
  const nftList: NFTType[] = getNFTList(response.result);
  return {
    data: nftList,
    previousCursor: data.cursor,
    nextCursor: response.cursor,
    total: response.total,
    page: response.page,
  };
});

export const getWishlistNFTs = createAsyncThunk("portfolio/GET_WISHLIST_NFT", async (data: GetNFTProps) => {
  const address = "0xd45058Bf25BBD8F586124C479D384c8C708CE23A";
  const chain = "eth";
  const limit = data.limit;
  const response = await data.account.getNFTs({ address, chain, limit, cursor: data.cursor });
  const nftList: NFTType[] = getNFTList(response.result);
  return {
    data: nftList,
    previousCursor: data.cursor,
    nextCursor: response.cursor,
    total: response.total,
    page: response.page,
  };
});

const setPreviousCursor = (cursorList: string[], newCursor: string | null | undefined): string[] => {
  if (newCursor === null || newCursor === undefined) return cursorList;
  let cursors = [...cursorList];
  if (cursors[cursors.length - 2] === newCursor) {
    cursors.splice(-1);
  } else {
    cursors = [...cursors, newCursor];
  }
  return cursors;
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    clearStore(state: PortfolioProps) {
      state.dashboard.data = [];
      state.collection.data = [];
      state.dashboard.nextCursor = "";
      state.dashboard.previousCursor = [""];
      state.dashboard.page = 0;
      state.dashboard.total = 0;
      state.dashboard.hasError = false;
      state.collection.nextCursor = "";
      state.collection.previousCursor = [""];
      state.collection.page = 0;
      state.collection.total = 0;
      state.collection.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboardNFTs.fulfilled, (state, action) => {
      state.dashboard.data = action.payload.data;
      state.dashboard.isLoading = false;
      state.dashboard.hasError = false;
      state.dashboard.nextCursor = action.payload?.nextCursor || "";
      state.dashboard.total = action.payload.total;
      state.dashboard.page = action.payload.page;
      state.dashboard.previousCursor = setPreviousCursor(
        state.dashboard.previousCursor,
        action.payload?.previousCursor,
      );
    });
    builder.addCase(getDashboardNFTs.pending, (state) => {
      state.dashboard.isLoading = true;
    });
    builder.addCase(getDashboardNFTs.rejected, (state) => {
      state.dashboard.isLoading = false;
      state.dashboard.hasError = true;
    });
    builder.addCase(getCollectionNFTs.fulfilled, (state, action) => {
      state.collection.data = action.payload.data;
      state.collection.isLoading = false;
      state.collection.hasError = false;
      state.collection.nextCursor = action.payload?.nextCursor || "";
      state.collection.total = action.payload.total;
      state.collection.page = action.payload.page;
      state.collection.previousCursor = setPreviousCursor(
        state.collection.previousCursor,
        action.payload?.previousCursor,
      );
    });
    builder.addCase(getCollectionNFTs.pending, (state) => {
      state.collection.isLoading = true;
    });
    builder.addCase(getCollectionNFTs.rejected, (state) => {
      state.collection.isLoading = false;
      state.collection.hasError = true;
    });
    builder.addCase(getWishlistNFTs.fulfilled, (state, action) => {
      state.wishlist.data = action.payload.data;
      state.wishlist.isLoading = false;
      state.wishlist.hasError = false;
      state.wishlist.nextCursor = action.payload?.nextCursor || "";
      state.wishlist.total = action.payload.total;
      state.wishlist.page = action.payload.page;
      state.wishlist.previousCursor = setPreviousCursor(state.wishlist.previousCursor, action.payload?.previousCursor);
    });
    builder.addCase(getWishlistNFTs.pending, (state) => {
      state.wishlist.isLoading = true;
    });
    builder.addCase(getWishlistNFTs.rejected, (state) => {
      state.wishlist.isLoading = false;
      state.wishlist.hasError = true;
    });
  },
});

export const { clearStore } = portfolioSlice.actions;

export default portfolioSlice.reducer;