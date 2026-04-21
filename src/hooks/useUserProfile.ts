import { useState, useEffect, useCallback } from "react";

export type Origin = "US" | "India" | "Other" | null;
export type Intent = "PR" | "Study" | "Work" | "Visit" | null;

export interface UserProfile {
  origin: Origin;
  intent: Intent;
  crsScore: number | null;
  nocCode: string | null;
  lastVisit: string | null;
  visitCount: number;
}

const STORAGE_KEY = "4aces_user_profile_v1";

const defaultProfile: UserProfile = {
  origin: null,
  intent: null,
  crsScore: null,
  nocCode: null,
  lastVisit: null,
  visitCount: 0,
};

function readProfile(): UserProfile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return defaultProfile;
  }
}

function writeProfile(p: UserProfile) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* quota / private mode */
  }
}

/**
 * Site-wide user profile persisted in localStorage.
 * Drives personalization on HomePage, CRS, NOC, EE Draws, Quiz, etc.
 */
export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    const initial = readProfile();
    // bump visit on first mount
    const updated: UserProfile = {
      ...initial,
      visitCount: (initial.visitCount ?? 0) + 1,
      lastVisit: new Date().toISOString(),
    };
    setProfile(updated);
    writeProfile(updated);
  }, []);

  const update = useCallback((patch: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      writeProfile(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setProfile(defaultProfile);
    writeProfile(defaultProfile);
  }, []);

  return { profile, update, reset };
}