// src-tauri/src/app_data.rs
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct Session {
    pub title: String,
    pub category: String,
    pub start_time: String, // ISO 8601
    pub end_time: String,   // ISO 8601
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Intervals {
    pub work: u32,        // seconds
    pub short_break: u32, // seconds
    pub long_break: u32,  // seconds
}

impl Default for Intervals {
    fn default() -> Self {
        Self {
            work: 45 * 60,
            short_break: 5 * 60,
            long_break: 15 * 60,
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Settings {
    pub sound: bool,
    pub volume: f32, // 0.0 - 1.0
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            sound: true,
            volume: 0.7,
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AppData {
    pub sessions: Vec<Session>,
    pub intervals: Intervals,
    pub settings: Settings,
}

impl Default for AppData {
    fn default() -> Self {
        Self {
            sessions: Vec::new(),
            intervals: Intervals::default(),
            settings: Settings::default(),
        }
    }
}
