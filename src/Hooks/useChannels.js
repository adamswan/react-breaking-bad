import { useState, useEffect } from "react";
import { getChannelsAPI } from "../apis/publish";

export function useGetChannels() {
  // 频道下拉数据源
  const [channels, setChannels] = useState([]);

  // 获取频道数据
  async function getChannels() {
    const newVal = await getChannelsAPI();
    setChannels(newVal.data.data.channels);
  }

  useEffect(() => {
    getChannels();
  }, []);

  return {
    channels,
    setChannels,
  };
}
