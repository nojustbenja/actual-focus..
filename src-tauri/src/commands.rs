// src-tauri/src/commands.rs
use crate::app_data::{AppData};
use std::fs;
use std::path::PathBuf;
use tauri::{Manager, AppHandle, command};

const DATA_FILE: &str = "app_data.json";

fn get_data_path(app_handle: &AppHandle) -> PathBuf {
    app_handle.path().app_data_dir()
        .unwrap_or_else(|_| std::env::current_dir().unwrap())
        .join(DATA_FILE)
}

#[command]
pub fn load_data(app_handle: AppHandle) -> Result<AppData, String> {
    let path = get_data_path(&app_handle);
    if path.exists() {
        let data = fs::read_to_string(&path).map_err(|e| e.to_string())?;
        serde_json::from_str(&data).map_err(|e| e.to_string())
    } else {
        Ok(AppData::default())
    }
}

#[command]
pub fn save_data(app_handle: AppHandle, data: AppData) -> Result<(), String> {
    let path = get_data_path(&app_handle);
    let json = serde_json::to_string_pretty(&data).map_err(|e| e.to_string())?;
    fs::create_dir_all(path.parent().unwrap()).map_err(|e| e.to_string())?;
    fs::write(&path, json).map_err(|e| e.to_string())
}

#[command]
pub fn reset_data(app_handle: AppHandle) -> Result<(), String> {
    let path = get_data_path(&app_handle);
    let json = serde_json::to_string_pretty(&AppData::default()).map_err(|e| e.to_string())?;
    fs::create_dir_all(path.parent().unwrap()).map_err(|e| e.to_string())?;
    fs::write(&path, json).map_err(|e| e.to_string())
}
