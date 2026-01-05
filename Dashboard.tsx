
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { saveUser } from '../services/storage';
import { getEarningStrategy } from '../services/ai';
import { Skyscraper160x600 } from '../components/AdBanners';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Dashboard: React.FC<Props> = ({ user, setUser }) => {
  const [withdrawing, setWithdrawing] = useState(false);
  const [message, setMessage] = useState('');
  const [aiTip, setAiTip] = useState<string>('');
  const [loadingTip, setLoadingTip] = useState(true);

  useEffect(() => {
    async function fetchTip() {
      try {
        const tip = await getEarningStrategy(user.balance, user.referrals);
        setAiTip(tip);
      } catch (e) {
        setAi