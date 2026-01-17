import backgroundImg from "./image.png";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TAX_A = 0.234956; // BUCD
const TAX_B = 0.420199; // ACF

// HARD-CODED PACKAGE DATA
const packageData = [
   { "Packages": "499UP", "ACF": 99.8, "BUCD": 399.2, "RentalExcludeTax": 499, "ACFPercent": 0.2, "BUCDPercent": 0.8 },
  { "Packages": "500CO", "ACF": 600, "BUCD": 0, "RentalExcludeTax": 600, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "A0099", "ACF": 0, "BUCD": 118.8, "RentalExcludeTax": 118.8, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "A0290", "ACF": 0, "BUCD": 348, "RentalExcludeTax": 348, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "A0550", "ACF": 0, "BUCD": 660, "RentalExcludeTax": 660, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "A0790", "ACF": 0, "BUCD": 948, "RentalExcludeTax": 948, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "A0990", "ACF": 0, "BUCD": 1188, "RentalExcludeTax": 1188, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "A1290", "ACF": 0, "BUCD": 1548, "RentalExcludeTax": 1548, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "A1690", "ACF": 0, "BUCD": 2028, "RentalExcludeTax": 2028, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "A2020", "ACF": 0, "BUCD": 2508, "RentalExcludeTax": 2508, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "A2990", "ACF": 0, "BUCD": 3588, "RentalExcludeTax": 3588, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "A3890", "ACF": 0, "BUCD": 4668, "RentalExcludeTax": 4668, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "A5790", "ACF": 0, "BUCD": 6948, "RentalExcludeTax": 6948, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "A9590", "ACF": 0, "BUCD": 11508, "RentalExcludeTax": 11508, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "ACTVF", "ACF": 360, "BUCD": 0, "RentalExcludeTax": 360, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "ADR15", "ACF": 0, "BUCD": 808.91, "RentalExcludeTax": 808.91, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "ATMX1", "ACF": 0, "BUCD": 17988, "RentalExcludeTax": 17988, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "ATMX2", "ACF": 0, "BUCD": 23988, "RentalExcludeTax": 23988, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "AVHD1", "ACF": 168.93, "BUCD": 2234.15, "RentalExcludeTax": 2403.08, "ACFPercent": 0.0702973, "BUCDPercent": 0.9297027 },
  { "Packages": "AVHD2", "ACF": 168.93, "BUCD": 2234.15, "RentalExcludeTax": 2403.08, "ACFPercent": 0.0702973, "BUCDPercent": 0.9297027 },
  { "Packages": "AVHD5", "ACF": 168.93, "BUCD": 2234.15, "RentalExcludeTax": 2403.08, "ACFPercent": 0.0702973, "BUCDPercent": 0.9297027 },
  { "Packages": "AVI01", "ACF": 87.59, "BUCD": 1246.02, "RentalExcludeTax": 1333.61, "ACFPercent": 0.0656789, "BUCDPercent": 0.9343211 },
  { "Packages": "AVI02", "ACF": 87.59, "BUCD": 1246.02, "RentalExcludeTax": 1333.61, "ACFPercent": 0.0656789, "BUCDPercent": 0.9343211 },
  { "Packages": "AVI05", "ACF": 87.59, "BUCD": 1246.02, "RentalExcludeTax": 1333.61, "ACFPercent": 0.0656789, "BUCDPercent": 0.9343211 },
  { "Packages": "B1000", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "B2000", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "B3000", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "B5000", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "BASLD", "ACF": 780, "BUCD": 2220, "RentalExcludeTax": 3000, "ACFPercent": 0.26, "BUCDPercent": 0.74 },
  { "Packages": "BASLV", "ACF": 780, "BUCD": 120, "RentalExcludeTax": 900, "ACFPercent": 0.8666667, "BUCDPercent": 0.1333333 },
  { "Packages": "BB240", "ACF": 0, "BUCD": 288, "RentalExcludeTax": 288, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "BBC50", "ACF": 0, "BUCD": 60, "RentalExcludeTax": 60, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "BBSUB", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "BBUPA", "ACF": 0, "BUCD": 240, "RentalExcludeTax": 240, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "BBUPX", "ACF": 0, "BUCD": 358.8, "RentalExcludeTax": 358.8, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "BSCCS", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "BSCEB", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "BSNFC", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "BSPOS", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "BSSMS", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "BSTRK", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CG240", "ACF": 211.89, "BUCD": 28.11, "RentalExcludeTax": 240, "ACFPercent": 0.8828750, "BUCDPercent": 0.1171250 },
  { "Packages": "CG249", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CG333", "ACF": 58.6, "BUCD": 202.2, "RentalExcludeTax": 260.8, "ACFPercent": 0.2246933, "BUCDPercent": 0.7753067 },
  { "Packages": "CG444", "ACF": 20.64, "BUCD": 108.09, "RentalExcludeTax": 128.73, "ACFPercent": 0.1603356, "BUCDPercent": 0.8396644 },
  { "Packages": "CG477", "ACF": 281.55, "BUCD": 114.4, "RentalExcludeTax": 395.95, "ACFPercent": 0.7110746, "BUCDPercent": 0.2889254 },
  { "Packages": "CG577", "ACF": 276.93, "BUCD": 205.84, "RentalExcludeTax": 482.77, "ACFPercent": 0.5736272, "BUCDPercent": 0.4263728 },
  { "Packages": "CG650", "ACF": 469.62, "BUCD": 0, "RentalExcludeTax": 469.62, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "CGDVO", "ACF": 280.24, "BUCD": 0, "RentalExcludeTax": 280.24, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "CGFOS", "ACF": 123.66, "BUCD": 280.21, "RentalExcludeTax": 403.87, "ACFPercent": 0.3061876, "BUCDPercent": 0.6938124 },
  { "Packages": "CGPIT", "ACF": 102.31, "BUCD": 16.66, "RentalExcludeTax": 118.97, "ACFPercent": 0.8599647, "BUCDPercent": 0.1400353 },
  { "Packages": "CGPR1", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CGTOP", "ACF": 148.59, "BUCD": 650, "RentalExcludeTax": 798.59, "ACFPercent": 0.1860654, "BUCDPercent": 0.8139346 },
  { "Packages": "CGUN2", "ACF": 250, "BUCD": 750, "RentalExcludeTax": 1000, "ACFPercent": 0.25, "BUCDPercent": 0.75 },
  { "Packages": "CGUNL", "ACF": 193, "BUCD": 400, "RentalExcludeTax": 593, "ACFPercent": 0.3254637, "BUCDPercent": 0.6745363 },
  { "Packages": "CGUP2", "ACF": 145.4, "BUCD": 581.6, "RentalExcludeTax": 727, "ACFPercent": 0.20, "BUCDPercent": 0.80 },
  { "Packages": "CGWN2", "ACF": 143.78, "BUCD": 656.36, "RentalExcludeTax": 800.14, "ACFPercent": 0.1796936, "BUCDPercent": 0.8203064 },
  { "Packages": "CGWNL", "ACF": 143.78, "BUCD": 656.39, "RentalExcludeTax": 800.17, "ACFPercent": 0.1796868, "BUCDPercent": 0.8203132 },
  { "Packages": "CI477", "ACF": 281.55, "BUCD": 114.4, "RentalExcludeTax": 395.95, "ACFPercent": 0.7110746, "BUCDPercent": 0.2889254 },
  { "Packages": "CI577", "ACF": 276.93, "BUCD": 205.84, "RentalExcludeTax": 482.77, "ACFPercent": 0.5736272, "BUCDPercent": 0.4263728 },
  { "Packages": "CI650", "ACF": 469.62, "BUCD": 0, "RentalExcludeTax": 469.62, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "CI999", "ACF": 1200, "BUCD": 600, "RentalExcludeTax": 1800, "ACFPercent": 0.6666667, "BUCDPercent": 0.3333333 },
  { "Packages": "CIT30", "ACF": 215, "BUCD": 1363.3, "RentalExcludeTax": 1578.3, "ACFPercent": 0.1362225, "BUCDPercent": 0.8637775 },
  { "Packages": "CIPIT", "ACF": 102.31, "BUCD": 16.66, "RentalExcludeTax": 118.97, "ACFPercent": 0.8599647, "BUCDPercent": 0.1400353 },
  { "Packages": "CITOP", "ACF": 148.59, "BUCD": 650, "RentalExcludeTax": 798.59, "ACFPercent": 0.1860654, "BUCDPercent": 0.8139346 },
  { "Packages": "CIUNL", "ACF": 193, "BUCD": 400, "RentalExcludeTax": 593, "ACFPercent": 0.3254637, "BUCDPercent": 0.6745363 },
  { "Packages": "CIWN2", "ACF": 143.78, "BUCD": 656.36, "RentalExcludeTax": 800.14, "ACFPercent": 0.1796936, "BUCDPercent": 0.8203064 },
  { "Packages": "CIWNL", "ACF": 143.78, "BUCD": 656.39, "RentalExcludeTax": 800.17, "ACFPercent": 0.1796868, "BUCDPercent": 0.8203132 },
  { "Packages": "CLT30", "ACF": 215, "BUCD": 1363.3, "RentalExcludeTax": 1578.3, "ACFPercent": 0.1362225, "BUCDPercent": 0.8637775 },
  { "Packages": "COMEN", "ACF": 15.34, "BUCD": 291.36, "RentalExcludeTax": 306.7, "ACFPercent": 0.0500163, "BUCDPercent": 0.9499837 },
  { "Packages": "COND1", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "COND2", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CONV1", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CORPB", "ACF": 100, "BUCD": 0, "RentalExcludeTax": 100, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "CORPG", "ACF": 300, "BUCD": 0, "RentalExcludeTax": 300, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "CORPM", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CORPS", "ACF": 240, "BUCD": 118, "RentalExcludeTax": 358, "ACFPercent": 0.6703911, "BUCDPercent": 0.3296089 },
  { "Packages": "CORPT", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CORPW", "ACF": 288, "BUCD": 0, "RentalExcludeTax": 288, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "CORPX", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CR999", "ACF": 1200, "BUCD": 600, "RentalExcludeTax": 1800, "ACFPercent": 0.6666667, "BUCDPercent": 0.3333333 },
  { "Packages": "CRMTR", "ACF": 1200, "BUCD": 3598, "RentalExcludeTax": 4798, "ACFPercent": 0.2501042, "BUCDPercent": 0.7498958 },
  { "Packages": "CRPBB", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CRPGI", "ACF": 300, "BUCD": 0, "RentalExcludeTax": 300, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "CRPIB", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CRPIC", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CRPMI", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CRPSI", "ACF": 240, "BUCD": 118, "RentalExcludeTax": 358, "ACFPercent": 0.6703911, "BUCDPercent": 0.3296089 },
  { "Packages": "CRPTI", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "CRPWI", "ACF": 288, "BUCD": 0, "RentalExcludeTax": 288, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "CRPWR", "ACF": 288, "BUCD": 0, "RentalExcludeTax": 288, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "DB099", "ACF": 0, "BUCD": 118.8, "RentalExcludeTax": 118.8, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "DB299", "ACF": 0, "BUCD": 358.8, "RentalExcludeTax": 358.8, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "DBO99", "ACF": 0, "BUCD": 118.8, "RentalExcludeTax": 118.8, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "DE890", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "DEALS", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "DEALZ", "ACF": 150, "BUCD": 150, "RentalExcludeTax": 300, "ACFPercent": 0.5, "BUCDPercent": 0.5 },
  { "Packages": "DISB1", "ACF": 180, "BUCD": 0, "RentalExcludeTax": 180, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "DISB2", "ACF": 180, "BUCD": 0, "RentalExcludeTax": 180, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "DSCMB", "ACF": 33.8, "BUCD": 1255.1, "RentalExcludeTax": 1288.9, "ACFPercent": 0.0262239, "BUCDPercent": 0.9737761 },
  { "Packages": "EMPCG", "ACF": 118, "BUCD": 0, "RentalExcludeTax": 118, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "EMPFM", "ACF": 240, "BUCD": 118, "RentalExcludeTax": 358, "ACFPercent": 0.6703911, "BUCDPercent": 0.3296089 },
  { "Packages": "EMPL", "ACF": 60, "BUCD": 0, "RentalExcludeTax": 60, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "ENTSC", "ACF": 13.73, "BUCD": 260.82, "RentalExcludeTax": 274.55, "ACFPercent": 0.0500091, "BUCDPercent": 0.9499909 },
  { "Packages": "F0001", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "F0002", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "F0003", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "F0004", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "FAMIL", "ACF": 820, "BUCD": 3280, "RentalExcludeTax": 4100, "ACFPercent": 0.2, "BUCDPercent": 0.8 },
  { "Packages": "FD001", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "FD002", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "FD003", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "FD004", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "FMSUB", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "FORC2", "ACF": 232.8, "BUCD": 127.2, "RentalExcludeTax": 360, "ACFPercent": 0.6466667, "BUCDPercent": 0.3533333 },
  { "Packages": "FORCS", "ACF": 589.86, "BUCD": 127.8, "RentalExcludeTax": 717.66, "ACFPercent": 0.8219212, "BUCDPercent": 0.1780788 },
  { "Packages": "FORG2", "ACF": 232.8, "BUCD": 127.2, "RentalExcludeTax": 360, "ACFPercent": 0.6466667, "BUCDPercent": 0.3533333 },
  { "Packages": "FP10", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "FRDEM", "ACF": 240, "BUCD": 180, "RentalExcludeTax": 420, "ACFPercent": 0.5714286, "BUCDPercent": 0.4285714 },
  { "Packages": "FX240", "ACF": 300, "BUCD": 0, "RentalExcludeTax": 300, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "FX477", "ACF": 281.55, "BUCD": 114.4, "RentalExcludeTax": 395.95, "ACFPercent": 0.7110746, "BUCDPercent": 0.2889254 },
  { "Packages": "FX577", "ACF": 276.93, "BUCD": 205.84, "RentalExcludeTax": 482.77, "ACFPercent": 0.5736272, "BUCDPercent": 0.4263728 },
  { "Packages": "FX650", "ACF": 469.62, "BUCD": 0, "RentalExcludeTax": 469.62, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "FX750", "ACF": 480, "BUCD": 420, "RentalExcludeTax": 900, "ACFPercent": 0.5333333, "BUCDPercent": 0.4666667 },
  { "Packages": "FX790", "ACF": 720, "BUCD": 228, "RentalExcludeTax": 948, "ACFPercent": 0.7594937, "BUCDPercent": 0.2405063 },
  { "Packages": "FXTOP", "ACF": 148.59, "BUCD": 650, "RentalExcludeTax": 798.59, "ACFPercent": 0.1860654, "BUCDPercent": 0.8139346 },
  { "Packages": "FXUN2", "ACF": 250, "BUCD": 750, "RentalExcludeTax": 1000, "ACFPercent": 0.25, "BUCDPercent": 0.75 },
  { "Packages": "FXUNL", "ACF": 193, "BUCD": 400, "RentalExcludeTax": 593, "ACFPercent": 0.3254637, "BUCDPercent": 0.6745363 },
  { "Packages": "GOVSP", "ACF": 258, "BUCD": 120, "RentalExcludeTax": 378, "ACFPercent": 0.6825397, "BUCDPercent": 0.3174603 },
  { "Packages": "GOVT", "ACF": 120, "BUCD": 0, "RentalExcludeTax": 120, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "I1290", "ACF": 0, "BUCD": 1548, "RentalExcludeTax": 1548, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "I475", "ACF": 0, "BUCD": 570, "RentalExcludeTax": 570, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "I590", "ACF": 0, "BUCD": 708, "RentalExcludeTax": 708, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "I890", "ACF": 0, "BUCD": 1068, "RentalExcludeTax": 1068, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "INDVO", "ACF": 280.24, "BUCD": 0, "RentalExcludeTax": 280.24, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "IP001", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "L2V01", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "M1790", "ACF": 0, "BUCD": 2148, "RentalExcludeTax": 2148, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "M2490", "ACF": 0, "BUCD": 2988, "RentalExcludeTax": 2988, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "M3490", "ACF": 0, "BUCD": 4188, "RentalExcludeTax": 4188, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "M3SHR", "ACF": 0, "BUCD": 100, "RentalExcludeTax": 100, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "M6490", "ACF": 0, "BUCD": 7788, "RentalExcludeTax": 7788, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "MASTD", "ACF": 0, "BUCD": 3598.8, "RentalExcludeTax": 3598.8, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "MASTR", "ACF": 1200, "BUCD": 3598, "RentalExcludeTax": 4798, "ACFPercent": 0.2501042, "BUCDPercent": 0.7498958 },
  { "Packages": "MASTV", "ACF": 1200, "BUCD": 600, "RentalExcludeTax": 1800, "ACFPercent": 0.6666667, "BUCDPercent": 0.3333333 },
  { "Packages": "MAX01", "ACF": 73.12, "BUCD": 966.97, "RentalExcludeTax": 1040.09, "ACFPercent": 0.0703016, "BUCDPercent": 0.9296984 },
  { "Packages": "MAX02", "ACF": 73.12, "BUCD": 966.97, "RentalExcludeTax": 1040.09, "ACFPercent": 0.0703016, "BUCDPercent": 0.9296984 },
  { "Packages": "MAX05", "ACF": 73.12, "BUCD": 966.97, "RentalExcludeTax": 1040.09, "ACFPercent": 0.0703016, "BUCDPercent": 0.9296984 },
  { "Packages": "MBDTF", "ACF": 0, "BUCD": 600, "RentalExcludeTax": 600, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "MMSUB", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "MPLU1", "ACF": 140, "BUCD": 560, "RentalExcludeTax": 700, "ACFPercent": 0.2, "BUCDPercent": 0.8 },
  { "Packages": "MPLU2", "ACF": 200, "BUCD": 800, "RentalExcludeTax": 1000, "ACFPercent": 0.2, "BUCDPercent": 0.8 },
  { "Packages": "MPLU3", "ACF": 140, "BUCD": 1260, "RentalExcludeTax": 1400, "ACFPercent": 0.1, "BUCDPercent": 0.9 },
  { "Packages": "MPLU4", "ACF": 220, "BUCD": 1980, "RentalExcludeTax": 2200, "ACFPercent": 0.1, "BUCDPercent": 0.9 },
  { "Packages": "MTRCK", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "MXTST", "ACF": 73.12, "BUCD": 966.97, "RentalExcludeTax": 1040.09, "ACFPercent": 0.0703016, "BUCDPercent": 0.9296984 },
  { "Packages": "NBIOT", "ACF": 0, "BUCD": 30, "RentalExcludeTax": 30, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "NFLIX", "ACF": 0, "BUCD": 1798.8, "RentalExcludeTax": 1798.8, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "NW100", "ACF": 0, "BUCD": 1668, "RentalExcludeTax": 1668, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "NW25", "ACF": 0, "BUCD": 660, "RentalExcludeTax": 660, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "NW50", "ACF": 0, "BUCD": 1188, "RentalExcludeTax": 1188, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "OBD01", "ACF": 0, "BUCD": 1490, "RentalExcludeTax": 1490, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "P0002", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "P0003", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "P0004", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "PENSY", "ACF": 132, "BUCD": 0, "RentalExcludeTax": 132, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "POPIT", "ACF": 102.31, "BUCD": 16.66, "RentalExcludeTax": 118.97, "ACFPercent": 0.8599647, "BUCDPercent": 0.1400353 },
  { "Packages": "PRM02", "ACF": 0, "BUCD": 1188, "RentalExcludeTax": 1188, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "RZERO", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "SLFCS", "ACF": 123.66, "BUCD": 280.21, "RentalExcludeTax": 403.87, "ACFPercent": 0.3061876, "BUCDPercent": 0.6938124 },
  { "Packages": "SLTGF", "ACF": 150, "BUCD": 150, "RentalExcludeTax": 300, "ACFPercent": 0.5, "BUCDPercent": 0.5 },
  { "Packages": "SM100", "ACF": 0, "BUCD": 13188, "RentalExcludeTax": 13188, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "SM250", "ACF": 0, "BUCD": 23988, "RentalExcludeTax": 23988, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "SME30", "ACF": 0, "BUCD": 1308, "RentalExcludeTax": 1308, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "SME65", "ACF": 0, "BUCD": 1788, "RentalExcludeTax": 1788, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "SMEMX", "ACF": 0, "BUCD": 3468, "RentalExcludeTax": 3468, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "SMUDI", "ACF": 89, "BUCD": 0, "RentalExcludeTax": 89, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "STAFF", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "STC", "ACF": 288, "BUCD": 0, "RentalExcludeTax": 288, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "STCM1", "ACF": 31.26, "BUCD": 413.46, "RentalExcludeTax": 444.72, "ACFPercent": 0.0702914, "BUCDPercent": 0.9297086 },
  { "Packages": "STCM2", "ACF": 31.26, "BUCD": 413.46, "RentalExcludeTax": 444.72, "ACFPercent": 0.0702914, "BUCDPercent": 0.9297086 },
  { "Packages": "STCM5", "ACF": 31.26, "BUCD": 413.46, "RentalExcludeTax": 444.72, "ACFPercent": 0.0702914, "BUCDPercent": 0.9297086 },
  { "Packages": "STCNW", "ACF": 288, "BUCD": 0, "RentalExcludeTax": 288, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "SUBUP", "ACF": 50, "BUCD": 0, "RentalExcludeTax": 50, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "UL130", "ACF": 0, "BUCD": 1558.8, "RentalExcludeTax": 1558.8, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "UL230", "ACF": 0, "BUCD": 2758.8, "RentalExcludeTax": 2758.8, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "UL430", "ACF": 0, "BUCD": 5158.8, "RentalExcludeTax": 5158.8, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "ULT30", "ACF": 215, "BUCD": 1363.3, "RentalExcludeTax": 1578.3, "ACFPercent": 0.1362225, "BUCDPercent": 0.8637775 },
  { "Packages": "UN490", "ACF": 0, "BUCD": 588, "RentalExcludeTax": 588, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "UP499", "ACF": 99.8, "BUCD": 399.2, "RentalExcludeTax": 499, "ACFPercent": 0.2, "BUCDPercent": 0.8 },
  { "Packages": "UP727", "ACF": 145.4, "BUCD": 581.6, "RentalExcludeTax": 727, "ACFPercent": 0.2, "BUCDPercent": 0.8 },
  { "Packages": "UPASB", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "VAL50", "ACF": 50, "BUCD": 0, "RentalExcludeTax": 50, "ACFPercent": 1.0, "BUCDPercent": null },
  { "Packages": "WB100", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "WB200", "ACF": 0, "BUCD": 200, "RentalExcludeTax": 200, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "WNLUL", "ACF": 143.78, "BUCD": 656.39, "RentalExcludeTax": 800.17, "ACFPercent": 0.1796868, "BUCDPercent": 0.8203132 },
  { "Packages": "Z0100", "ACF": 0, "BUCD": 13188, "RentalExcludeTax": 13188, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "Z0250", "ACF": 0, "BUCD": 23988, "RentalExcludeTax": 23988, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "ZDATA", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null },
  { "Packages": "ZM001", "ACF": 0, "BUCD": 475, "RentalExcludeTax": 475, "ACFPercent": null, "BUCDPercent": 1.0 },
  { "Packages": "ZMLRN", "ACF": 0, "BUCD": 0, "RentalExcludeTax": 0, "ACFPercent": null, "BUCDPercent": null }

];

function App() {
  // ================= BACKEND DATA =================
  const [fetchedPackage, setFetchedPackage] = useState([]);

  // ================= SEARCH STATE =================
  const [searchTerm, setSearchTerm] = useState("");

  // ================= LEFT SIDE STATES =================
  const [packageCode, setPackageCode] = useState("");
  const [leftResults, setLeftResults] = useState({
    bucd: 0,
    acf: 0,
    withoutTax: 0,
    withTax: 0,
    taxValue: 0,
  });

  // ================= RIGHT SIDE STATES =================
  const [acfPercent, setAcfPercent] = useState("");
  const [bucdPercent, setBucdPercent] = useState("");
  const [inputType, setInputType] = useState("With Tax");
  const [price, setPrice] = useState("");
  const [rightResults, setRightResults] = useState({
    bucd: 0,
    acf: 0,
    withoutTax: 0,
    withTax: 0,
    taxValue: 0,
  });

  // Fetch backend data once
  
     useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("https://backend-nameless-sea-7435.fly.dev/api/packages");
        console.log("Fetched packages from DB:", response.data);
        setFetchedPackage(response.data);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      }
    };
    fetchPackages();
  }, []);
  

  // ================= FILTERED PACKAGES =================
  const filteredPackages = fetchedPackage.filter((pkg) =>
    Object.values(pkg)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ================= LEFT CALCULATION =================
  const handleLeftView = () => {
    if (!packageCode.trim()) {
      alert("Enter a package code!");
      return;
    }

    const row = packageData.find(
      (p) => p.Packages?.toUpperCase() === packageCode.trim().toUpperCase()
    );

    if (!row) {
      alert("Package code not found in hardcoded data!");
      setLeftResults({ bucd: 0, acf: 0, withoutTax: 0, withTax: 0, taxValue: 0 });
      return;
    }

    const bucd = row.BUCD || 0;
    const acf = row.ACF || 0;
    const withoutTax = row.RentalExcludeTax || 0;
    const withTax = bucd * (1 + TAX_A) + acf * (1 + TAX_B);
    const taxValue = withTax - withoutTax;

    setLeftResults({ bucd, acf, withoutTax, withTax, taxValue });
  };

  // ================= RIGHT CALCULATION =================
  const handleRightCalculate = () => {
    let numPrice = parseFloat(price);
    let aPct = parseFloat(acfPercent) / 100;
    let bPct = parseFloat(bucdPercent) / 100;

    if (isNaN(numPrice) || numPrice <= 0) {
      alert("Enter a valid price!");
      return;
    }

    let bucd = 0,
      acf = 0,
      withTaxPrice = 0,
      withoutTaxPrice = 0;

    if (inputType === "With Tax") {
      withTaxPrice = numPrice;
      bucd = (withTaxPrice * bPct) / (1 + TAX_A);
      acf = (withTaxPrice * aPct) / (1 + TAX_B);
    } else {
      bucd = numPrice * bPct;
      acf = numPrice * aPct;
      withTaxPrice = bucd * (1 + TAX_A) + acf * (1 + TAX_B);
    }

    withoutTaxPrice = bucd + acf;
    const taxValue = withTaxPrice - withoutTaxPrice;

    setRightResults({ bucd, acf, withoutTax: withoutTaxPrice, withTax: withTaxPrice, taxValue });
  };

  return (
    <div className="full-screen">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>

      <div className="logo">NN.</div>

      <div className="main-container">
        {/* LEFT SIDE */}
        <div className="calculator-card">
          <h2>LOOKUP</h2>
          <label>Package Code</label>
          <input
            type="text"
            value={packageCode}
            onChange={(e) => setPackageCode(e.target.value)}
            placeholder="Enter package code"
          />
          <button onClick={handleLeftView}>View</button>

          <div className="results">
            <p>BUCD: {leftResults.bucd.toFixed(2)}</p>
            <p>ACF: {leftResults.acf.toFixed(2)}</p>
            <p>Without Tax: {leftResults.withoutTax.toFixed(2)}</p>
            <p>With Tax: {leftResults.withTax.toFixed(2)}</p>
            <p>Tax Value: {leftResults.taxValue.toFixed(2)}</p>

            {packageCode.trim() !== "" && (() => {
              const pkg = fetchedPackage.find(
                (p) => p.PKG?.trim().toUpperCase() === packageCode.trim().toUpperCase()
              );
              if (pkg) {
                return (
                  <>
                    <p>Decision: {pkg.Decision || "-"}</p>
                    <p>Type: {pkg.Type || "-"}</p>
                    <p>TRC Approval: {pkg.TRC_Approval || "-"}</p>
                    <p>Available New Activation: {pkg.Available_New_Activation || "-"}</p>
                    <p>Free Voice Bundle: {pkg.Free_Voice_Bundle || "-"}</p>
                    <p>Free SMS Bundle: {pkg.Free_SMS_Bundle || "-"}</p>
                    <p>Free Data Bundle: {pkg.Free_Dta_Bundle || "-"}</p>
                    <p>PCRF: {pkg.PCRF || "-"}</p>
                    <p>Voice Rate M2M: {pkg.Voice_Rate_M2M || "-"}</p>
                    <p>Voice Rate M2O: {pkg.Voice_Rate_M2O || "-"}</p>
                    <p>SMS Rate M2O: {pkg.SMS_Rate_M2O || "-"}</p>
                    <p>MMS Rate: {pkg.MMS_Rate || "-"}</p>
                    <p>Data Rate: {pkg.Data_Rate || "-"}</p>
                    <p>Deposit: {pkg.Deposit || "-"}</p>
                  </>
                );
              } else {
                return <p>Decision: Not found in DB</p>;
              }
            })()}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="calculator-card">
          <h2>TAXCAL</h2>
          <label>Voice Quota%:</label>
          <input
            type="number"
            value={acfPercent}
            onChange={(e) => setAcfPercent(e.target.value)}
            placeholder="Enter ACF %"
          />
          <label>Data Quota%:</label>
          <input
            type="number"
            value={bucdPercent}
            onChange={(e) => setBucdPercent(e.target.value)}
            placeholder="Enter BUCD %"
          />
          <label>Input Type:</label>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option>With Tax</option>
            <option>Without Tax</option>
          </select>
          <label>Package Price (Rs):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
          <button onClick={handleRightCalculate}>Calculate</button>

          <div className="results">
            <p>BUCD: {rightResults.bucd.toFixed(2)}</p>
            <p>ACF: {rightResults.acf.toFixed(2)}</p>
            <p>Without Tax: {rightResults.withoutTax.toFixed(2)}</p>
            <p>With Tax: {rightResults.withTax.toFixed(2)}</p>
            <p>Tax Value: {rightResults.taxValue.toFixed(2)}</p>
          </div>
        </div>

        {/* SEARCH CARD */}
        <div className="calculator-card search-card">
          <h2>SEARCH DETAILS</h2>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "10px", width: "100%", marginBottom: "15px", fontSize: "16px" }}
          />
          <div style={{ overflowX: "auto" }}>
            <table border="1" cellPadding="6" cellSpacing="0" style={{ width: "100%", fontSize: "14px" }}>
              <thead>
                <tr>
                  <th>PKG</th>
                  <th>Decision</th>
                  <th>Type</th>
                  <th>TRC Approval</th>
                  <th>Available New Activation</th>
                  <th>ACF</th>
                  <th>BUCD</th>
                  <th>Rental</th>
                  <th>Voice Rate M2M</th>
                  <th>Voice Rate M2O</th>
                  <th>SMS Rate M2O</th>
                  <th>MMS Rate</th>
                  <th>Data Rate</th>
                  <th>Free Voice Bundle</th>
                  <th>Free SMS Bundle</th>
                  <th>Free Data Bundle</th>
                  <th>PCRF</th>
                  <th>Deposit</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackages.map((pkg) => (
                  <tr key={pkg._id}>
                    <td>{pkg.PKG}</td>
                    <td>{pkg.Decision}</td>
                    <td>{pkg.Type}</td>
                    <td>{pkg.TRC_Approval}</td>
                    <td>{pkg.Available_New_Activation}</td>
                    <td>{pkg.ACF}</td>
                    <td>{pkg.BUCD}</td>
                    <td>{pkg.Rental}</td>
                    <td>{pkg.Voice_Rate_M2M}</td>
                    <td>{pkg.Voice_Rate_M2O}</td>
                    <td>{pkg.SMS_Rate_M2O}</td>
                    <td>{pkg.MMS_Rate}</td>
                    <td>{pkg.Data_Rate}</td>
                    <td>{pkg.Free_Voice_Bundle}</td>
                    <td>{pkg.Free_SMS_Bundle}</td>
                    <td>{pkg.Free_Dta_Bundle}</td>
                    <td>{pkg.PCRF}</td>
                    <td>{pkg.Deposit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
