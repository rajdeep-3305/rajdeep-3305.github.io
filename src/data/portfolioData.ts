import {
  Project,
  AxionLayer,
  HardwareExperiment,
  ControlSystemModel,
  ArsenalCategory,
  Stat,
} from '../types/portfolio';

export const AXION_LAYERS: AxionLayer[] = [
  {
    step: "01",
    title: "AOSP Platform Architecture",
    subtitle: "Streamlined, High-Performance Android Operating System",
    description:
      "AxionOS is a streamlined alternative to bloated manufacturer Android skins — built to make your device faster, more responsive, and more reliable.\n\nBased on LineageOS and inspired by minimalist design, AxionOS prioritizes clean performance, essential features without bloat, and long-term stability.",
    productContext: "AxionAOSP Platform & Visual Architecture",
    myRole: "Official Device Maintainer & Platform Contributor",
    myContribution:
      "Architecture & Core Tweaks: Designed to replace bloated OEM skins with a fast, lightweight baseline. Employs custom scheduling tweaks like AxBoostFwk and SfCpuPolicy to prevent UI jank. Integrates Xen PC Mode and GameSpace performance dashboard.",
    tags: ["AxionOS", "LineageOS Base", "AxBoostFwk", "SfCpuPolicy", "Xen PC Mode", "GameSpace"],
    images: [
      { src: "/assets/axion/hero_main.webp", caption: "AxionOS Identity", tag: "SystemUI" },
    ],
    codeSnippet: {
      filename: "build/core/product_config.mk",
      language: "makefile",
      code: `# AxionOS Platform Architecture & Native Services
PRODUCT_NAME := axion_rubyx
PRODUCT_DEVICE := rubyx
PRODUCT_BRAND := Xiaomi
PRODUCT_MODEL := Redmi Note 12 Pro 5G

# Minimalist Core Framework Configuration
PRODUCT_SYSTEM_PROPERTIES += \\
    ro.axion.version=2.7 \\
    ro.config.low_ram=false \\
    ro.sys.fw.bg_apps_limit=32 \\
    ro.surface_flinger.has_wide_color_display=true`,
    },
    telemetry: [
      { key: "Target Architecture", val: "ARM64-v8a" },
      { key: "Base Platform", val: "Android 17 / LineageOS 24.0" },
      { key: "UI Optimization", val: "AxBoostFwk & SfCpuPolicy" },
    ],
    accentColor: "#89AACC",
  },
  {
    step: "02",
    title: "Device Tree Development",
    subtitle: "Redmi Note 12 Pro 5G (rubyx) Hardware Integration",
    description:
      "Engineered comprehensive device tree and hardware abstraction layers for the Redmi Note 12 Pro 5G (rubyx) — bringing modern Android 17 to a device abandoned by the manufacturer after Android 14.",
    productContext: "Device Tree & Hardware HAL Bring-up",
    myRole: "Device Tree Architect",
    myContribution:
      "Device Specifications: MediaTek Dimensity 1080 (6nm process), 2x Cortex-A78 @ 2.6GHz, 6x Cortex-A55 @ 2.0GHz, Mali-G68 GPU, 120Hz AMOLED display, 5000mAh battery, 67W Turbo charging. Engineered full DRM/KMS display HAL, camera HIDL bindings, audio routing, and touch calibration.",
    tags: ["Redmi Note 12 Pro 5G", "MediaTek MT6877", "Android 17 Bring-up", "120Hz AMOLED", "HAL Integration"],
    images: [
      { src: "/assets/axion/workspace_front.webp", caption: "rubyx Architecture", tag: "Device Tree" },
    ],
    codeSnippet: {
      filename: "device_xiaomi_rubyx/BoardConfig.mk",
      language: "makefile",
      code: `# Xiaomi rubyx MediaTek Dimensity 1080 Configuration
TARGET_ARCH := arm64
TARGET_ARCH_VARIANT := armv8-2a-dotprod
TARGET_CPU_ABI := arm64-v8a
TARGET_CPU_VARIANT := cortex-a78

# Hardware Abstraction Layers
BOARD_USES_MTK_HARDWARE := true
TARGET_SCREEN_DENSITY := 440
TARGET_USES_DRM_DISPLAY := true
TARGET_USES_AOSP_SURFACEFLINGER := true

# SELinux Policy
BOARD_VENDOR_SEPOLICY_DIRS += device/xiaomi/rubyx/sepolicy/vendor`,
    },
    telemetry: [
      { key: "SoC Platform", val: "Dimensity 1080 (6nm)" },
      { key: "Display Panel", val: "120Hz AMOLED Dynamic" },
      { key: "Battery & Charging", val: "5000mAh / 67W Turbo" },
    ],
    accentColor: "#4E85BF",
  },
  {
    step: "03",
    title: "Linux Kernel Development",
    subtitle: "Custom Linux 4.19.325 LTS Architecture",
    description:
      "Architected and maintained a high-efficiency Linux 4.19.325 LTS kernel specifically tuned for the MediaTek MT6877 platform, delivering superior frame-rate consistency, thermal headroom, and battery longevity.",
    productContext: "Linux Kernel Engineering & Subsystems",
    myRole: "Linux Kernel Developer",
    myContribution:
      "Implemented comprehensive kernel enhancements: custom Energy Aware Scheduling (EAS) tuning, CPU governor policies, Mali GPU frequency scaling, memory management optimizations, BPF backports, LZ4 compression algorithms, Low Memory Killer (LMK), PSI metric tracking, and CIP patch integration.",
    tags: ["Linux 4.19.325", "EAS Scheduler", "CPU Policies", "BPF Subsystem", "LZ4 Compression", "LMK & PSI"],
    images: [
      { src: "/assets/axion/kernel_manager.webp", caption: "Kernel Architecture", tag: "Linux 4.19" },
    ],
    codeSnippet: {
      filename: "kernel_xiaomi_mt6877/kernel/sched/cpufreq_schedutil.c",
      language: "c",
      code: `/*
 * Linux 4.19.325 LTS EAS CPU Frequency Governor Policy
 * Optimized for MediaTek MT6877 (2x A78 + 6x A55)
 */
static void sugov_update_single(struct update_util_data *hook, u64 time,
                                unsigned int flags)
{
    struct sugov_cpu *sg_cpu = container_of(hook, struct sugov_cpu, update_util);
    struct sugov_policy *sg_policy = sg_cpu->sg_policy;
    unsigned int next_f;

    /* Evaluate energy-aware utilization with LZ4 / PSI headroom */
    sugov_get_util(&sg_cpu->util);
    next_f = get_next_freq(sg_policy, sg_cpu->util.util, sg_policy->policy->max);
    sugov_update_commit(sg_policy, time, next_f);
}`,
    },
    telemetry: [
      { key: "Kernel Version", val: "Linux 4.19.325 LTS" },
      { key: "Governor", val: "EAS Schedutil Custom" },
      { key: "Memory Engine", val: "LZ4 & PSI Tracking" },
    ],
    accentColor: "#6E9CD0",
  },
  {
    step: "04",
    title: "Build Infrastructure & Distribution",
    subtitle: "Automated Cloud CI/CD & Global CDN Pipeline",
    description:
      "Engineered automated build generation on Google Cloud Platform (GCP) coupled with Cloudflare Global CDN distribution, delivering verified, cryptographically signed OTA updates to thousands of active users worldwide.",
    productContext: "Cloud CI/CD & Global OTA Distribution",
    myRole: "Official Release Maintainer",
    myContribution:
      "Automated pipeline: GCP Build Servers compile and sign release packages -> Cloudflare Global CDN distributes delta OTA payloads -> rubyx users receive low-latency monthly security updates.",
    tags: ["Google Cloud Platform", "Cloudflare CDN", "OTA Pipeline", "5,142+ Builds", "Automated CI/CD"],
    images: [
      { src: "/assets/axion/theme_store_1.webp", caption: "OTA Distribution", tag: "Cloud CDN" },
    ],
    codeSnippet: {
      filename: "terminal@rubyx: ~/android/axion-2.7",
      language: "bash",
      code: `# Build & Release Compilation Sequence
$ source build/envsetup.sh
$ axion rubyx userdebug vanilla/gms
$ ax -br

# Output: [100% 41258/41258] Payload signed with release keys.
# SHA256 verified -> Dispatched to Cloudflare CDN distribution.`,
    },
    telemetry: [
      { key: "Build Infrastructure", val: "Google Cloud Platform" },
      { key: "Edge Distribution", val: "Cloudflare Global CDN" },
      { key: "Verified Downloads", val: "5,142+ Global Builds" },
    ],
    accentColor: "#A2C2E2",
  },
];

export const ARSENAL_CATEGORIES: ArsenalCategory[] = [
  // LEFT SIDE: ANDROID / LINUX SYSTEMS
  {
    id: "android",
    title: "ANDROID OS & AOSP",
    subtitle: "AOSP Architecture",
    gradient: "radial-gradient(circle at 20% 20%, rgba(26,58,106,0.35), rgba(8,14,26,0.2))",
    primaryTags: ["AOSP Core", "Custom ROMs", "Device Trees"],
    expandedTags: ["SELinux Enforcing", "Android Framework", "HAL Integration", "AIDL / HIDL", "Build Systems (Soong)", "Tombstone Debugging"],
    depth: "foreground",
  },
  {
    id: "kernel",
    title: "LINUX KERNEL ENGINEERING",
    subtitle: "Linux 4.19.325 Architecture",
    gradient: "radial-gradient(circle at 80% 20%, rgba(30,50,80,0.35), rgba(8,12,20,0.2))",
    primaryTags: ["Linux 4.19.325", "Scheduler Tuning", "CPU Policies"],
    expandedTags: ["Memory Management", "BPF Subsystem", "LZ4 Compression", "Low Memory Killer (LMK)", "PSI Metrics", "CIP Patching"],
    depth: "foreground",
  },
  {
    id: "programming",
    title: "SYSTEMS PROGRAMMING",
    subtitle: "Toolchains & Low-Level Code",
    gradient: "radial-gradient(circle at 30% 70%, rgba(42,26,74,0.35), rgba(10,6,16,0.2))",
    primaryTags: ["C / C++", "Python", "POSIX Bash"],
    expandedTags: ["ARM64 Assembly", "Makefiles / Blueprint", "LLVM / Clang", "GDB & Trace32", "Valgrind & ASan", "Gerrit Code Review"],
    depth: "midground",
  },

  // RIGHT SIDE: ELECTRICAL ENGINEERING
  {
    id: "electrical",
    title: "ELECTRICAL ENGINEERING",
    subtitle: "Circuits & Power Systems",
    gradient: "radial-gradient(circle at 70% 30%, rgba(58,42,26,0.35), rgba(16,10,6,0.2))",
    primaryTags: ["Circuit Analysis", "Power Systems", "Signal Processing"],
    expandedTags: ["Analog/Digital Interfacing", "Potential Transformers", "Hall Current Sensing", "Optoisolators", "Relay Protection", "Transient Protection"],
    depth: "foreground",
  },
  {
    id: "control",
    title: "CONTROL SYSTEMS",
    subtitle: "Mathematical Rigor & Dynamics",
    gradient: "radial-gradient(circle at 50% 50%, rgba(26,74,58,0.35), rgba(6,16,10,0.2))",
    primaryTags: ["MATLAB & Simulink", "Root Locus", "Bode Analysis"],
    expandedTags: ["State-Space Modeling", "PID Tuning", "Transient Step Response", "Phase / Gain Margins", "Transfer Functions", "Stability Criteria"],
    depth: "midground",
  },
  {
    id: "hardware",
    title: "HARDWARE SYSTEMS",
    subtitle: "Microcontrollers & Sensors",
    gradient: "radial-gradient(circle at 70% 80%, rgba(26,42,42,0.35), rgba(6,8,8,0.2))",
    primaryTags: ["Microcontrollers", "Sensors", "ADC Sampling"],
    expandedTags: ["UART / I2C / SPI", "Power Automation", "MQ-2 Gas Sensing", "ACS712 Metering", "Logic Analyzers", "Oscilloscopes"],
    depth: "background",
  },
];

export const HARDWARE_EXPERIMENTS: HardwareExperiment[] = [
  {
    id: "smart-meter",
    number: "01",
    year: "2025",
    title: "Smart Energy Meter",
    subtitle: "Real-Time Power Computation & Over-Current Protection",
    description:
      "Engineered an automated digital energy meter prototype utilizing an ACS712 Hall-effect current sensor and precision potential transformer. Programmed continuous real-time power computation (P = V × I) with automated over-current trip alerting for industrial energy audits.",
    components: ["Arduino Uno", "ACS712 Hall Sensor", "Potential Transformer", "16x2 I2C LCD", "Solid State Relay"],
    processSteps: [
      "AC Mains (230V RMS)",
      "ACS712 Hall Current Sensor",
      "Potential Transformer Step-Down",
      "Arduino ADC Sampling (P = V × I)",
      "16x2 LCD Telemetry Readout",
      "Over-Current Relay Trip (<15ms)",
    ],
    telemetry: [
      { label: "Sampling Rate", value: "1.0", unit: "kHz" },
      { label: "Voltage Range", value: "0 - 250", unit: "V AC" },
      { label: "Current Range", value: "0 - 30", unit: "A" },
      { label: "Trip Latency", value: "< 15", unit: "ms" },
    ],
    gradient: "radial-gradient(circle at 10% 20%, rgba(26,58,92,0.4), rgba(8,12,20,0.2))",
  },
  {
    id: "gas-detector",
    number: "02",
    year: "2025",
    title: "LPG & Gas Leakage Detection System",
    subtitle: "Hazardous Concentration Monitoring & HSE Safety Alerts",
    description:
      "Designed an industrial-grade combustible gas detection system using an MQ-2 semiconductor sensor. Built real-time threshold-based buzzer alarms and status LEDs, directly complying with Health, Safety, and Environment (HSE) safety standards in LPG storage environments.",
    components: ["Arduino Uno", "MQ-2 Gas Sensor", "Piezo Buzzer", "Multi-Stage LED Array", "Optoisolator"],
    processSteps: [
      "Combustible Gas Ingress (LPG/CH4)",
      "MQ-2 SnO2 Heated Element",
      "Analog Voltage Division",
      "ATmega328P Threshold Comparator",
      "Optoisolated Safety Relay Trip",
      "Piezo HSE Buzzer Alarm",
    ],
    telemetry: [
      { label: "Target Gases", value: "LPG / CH4", unit: "PPM" },
      { label: "Detection Range", value: "200 - 10000", unit: "PPM" },
      { label: "Alert Response", value: "< 2.0", unit: "sec" },
      { label: "HSE Compliance", value: "Class 1", unit: "Div 2" },
    ],
    gradient: "radial-gradient(circle at 80% 30%, rgba(58,42,26,0.4), rgba(16,10,6,0.2))",
  },
  {
    id: "home-automation",
    number: "03",
    year: "2025",
    title: "Embedded Power Automation System",
    subtitle: "Multi-Channel Relay Actuation & Sensor Feedback",
    description:
      "Developed an embedded automation unit to control domestic and industrial AC loads with optical isolation. Integrated ambient environmental sensor feedback for automated power scheduling and energy conservation.",
    components: ["Arduino Uno", "4-Channel Relay Module", "PIR Motion Sensor", "LDR Ambient Sensor", "Isolated Power Supply"],
    processSteps: [
      "PIR Motion & LDR Ambient Light",
      "Signal Conditioning Circuit",
      "Arduino Embedded Controller",
      "PC817 Optocoupler Isolation",
      "ULN2003 Relay Coil Drivers",
      "250V AC Appliance Actuation",
    ],
    telemetry: [
      { label: "Load Capacity", value: "250V / 10A", unit: "Per Channel" },
      { label: "Isolation", value: "3750", unit: "Vrms (Opto)" },
      { label: "Standby Power", value: "< 0.5", unit: "W" },
      { label: "Channels", value: "4", unit: "Isolated" },
    ],
    gradient: "radial-gradient(circle at 50% 80%, rgba(26,58,42,0.4), rgba(8,12,8,0.2))",
  },
];

export const CONTROL_SYSTEMS: ControlSystemModel[] = [
  {
    id: "root-locus",
    title: "Root Locus & Stability Analysis",
    subtitle: "S-Plane Closed-Loop Pole Trajectories",
    formula: "1 + K \\cdot G(s)H(s) = 0",
    description:
      "Computed continuous root loci as open-loop gain K varies from 0 to ∞. Evaluated system damping ratio (ζ), natural frequency (ω_n), and gain margins to prevent closed-loop instability across right-half-plane transitions.",
    parameters: [
      { name: "Damping Ratio (ζ)", value: "0.707", desc: "Optimal transient response" },
      { name: "Natural Frequency (ω_n)", value: "4.5 rad/s", desc: "System bandwidth" },
      { name: "Gain Margin (GM)", value: "+14.2 dB", desc: "Stability headroom" },
    ],
    gradient: "radial-gradient(circle at 20% 30%, rgba(26,42,74,0.4), rgba(8,10,20,0.2))",
  },
  {
    id: "frequency-response",
    title: "Bode & Nyquist Response",
    subtitle: "Gain & Phase Margins in Frequency Domain",
    formula: "G(j\\omega) = |G(j\\omega)| e^{j\\angle G(j\\omega)}",
    description:
      "Analyzed magnitude and phase characteristics across logarithmic frequency scales. Measured phase crossover frequency and gain margin to ensure robust performance under high-frequency noise and parasitic dynamics.",
    parameters: [
      { name: "Phase Margin (PM)", value: "52.4°", desc: "At gain crossover frequency" },
      { name: "Crossover Frequency", value: "12.8 rad/s", desc: "0 dB gain transition" },
      { name: "Bandwidth (BW)", value: "18.5 rad/s", desc: "-3 dB cutoff point" },
    ],
    gradient: "radial-gradient(circle at 80% 40%, rgba(42,26,58,0.4), rgba(10,6,16,0.2))",
  },
  {
    id: "state-space",
    title: "State-Space & Step Response",
    subtitle: "Dynamic Transient Analysis & PID Tuning",
    formula: "\\dot{x} = Ax + Bu, \\quad y = Cx + Du",
    description:
      "Formulated continuous state equations representing physical electromechanical systems. Evaluated time-domain step response parameters: rise time (t_r), peak overshoot (M_p), and settling time (t_s 2%).",
    parameters: [
      { name: "Rise Time (t_r)", value: "0.24 s", desc: "10% to 90% transition" },
      { name: "Peak Overshoot (M_p)", value: "4.3%", desc: "Maximum deviation" },
      { name: "Settling Time (t_s)", value: "0.85 s", desc: "Within ±2% band" },
    ],
    gradient: "radial-gradient(circle at 40% 80%, rgba(26,58,58,0.4), rgba(6,14,14,0.2))",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "axionaosp",
    number: "01",
    title: "AxionAOSP Official Maintainer",
    subtitle: "Redmi Note 12 Pro 5G (rubyx)",
    category: "ROM Maintainer",
    gradient: "radial-gradient(circle at 10% 20%, rgba(26,58,106,0.4), rgba(8,14,26,0.2))",
    image: "/assets/axion/hero_main.webp",
    description:
      "Official maintainer delivering high-performance AxionOS builds with 5,142+ recorded downloads. Resolved platform, vendor, and kernel build incompatibilities on modern Android 17.",
    links: [
      "https://github.com/AxionAOSP",
      "https://www.axionos.org/contributors",
      "https://cdn.axionos.org/#rubyx",
    ],
    tags: ["5,142+ Downloads", "MediaTek Dimensity 1080", "Android 17"],
    metrics: [
      { label: "Downloads", value: "5,142+" },
      { label: "Architecture", value: "ARM64" },
      { label: "Status", value: "Official Maintainer" },
    ],
  },
  {
    id: "device-tree",
    number: "02",
    title: "rubyx Device Tree & Android 17 Bringup",
    subtitle: "LineageOS 24.0 / Android 17 Architecture",
    category: "Device Tree Architect",
    gradient: "radial-gradient(circle at 90% 30%, rgba(42,26,74,0.4), rgba(10,8,14,0.2))",
    image: "/assets/axion/workspace_front.webp",
    description:
      "Brought up Android 17 on Xiaomi rubyx (abandoned at Android 14). Developed HAL bindings in C/C++ and Blueprint, resolving SELinux enforcement, 120Hz DRM/KMS display calibration, and camera pipelines.",
    links: ["https://github.com/rajdeep-3305/device_xiaomi_rubyx"],
    tags: ["Android 17", "HAL Integration", "SELinux Enforcing"],
    metrics: [
      { label: "Base OS", value: "Android 17" },
      { label: "Language", value: "C++ / Make" },
      { label: "SELinux", value: "Enforcing" },
    ],
  },
  {
    id: "kernel",
    number: "03",
    title: "MT6877 Linux Kernel Development",
    subtitle: "Custom Linux 4.19.325 LTS Architecture",
    category: "Kernel Developer",
    gradient: "radial-gradient(circle at 70% 80%, rgba(26,58,42,0.4), rgba(8,12,8,0.2))",
    image: "/assets/axion/kernel_manager.webp",
    description:
      "Custom Linux 4.19.325 LTS kernel with Energy Aware Scheduling (EAS), CPU/GPU DVFS governor tuning, memory optimizations, LZ4 compression, Low Memory Killer (LMK), and BPF subsystem backports.",
    links: ["https://github.com/rajdeep-3305/kernel_xiaomi_mt6877"],
    tags: ["Linux 4.19.325", "EAS Scheduler", "BPF Subsystem"],
    metrics: [
      { label: "Kernel Base", value: "Linux 4.19.325" },
      { label: "Scheduler", value: "EAS Custom" },
      { label: "Subsystems", value: "LZ4 / PSI / BPF" },
    ],
  },
  {
    id: "porting-guides",
    number: "04",
    title: "Android Porting & Debugging Guides",
    subtitle: "Reproducible Open-Source Documentation",
    category: "Technical Author",
    gradient: "radial-gradient(circle at 40% 60%, rgba(58,42,26,0.4), rgba(16,10,6,0.2))",
    image: "/assets/axion/depth1.webp",
    description:
      "Authored open-source documentation covering Android ROM, GSI, and recovery porting workflows, build troubleshooting, and kernel bring-up. Reached 23 GitHub stars and 3 forks.",
    links: [
      "https://github.com/rajdeep-3305/android-porting-guide",
      "https://github.com/rajdeep-3305/bbk-rom-porting",
    ],
    tags: ["23+ Stars", "GSI Porting", "Reproducible Workflows"],
    metrics: [
      { label: "GitHub Stars", value: "23+" },
      { label: "Forks", value: "3" },
      { label: "Focus", value: "Porting & Bringup" },
    ],
  },
];

export const STATS: Stat[] = [
  {
    value: "5,142+",
    numericValue: 5142,
    label: "ROM Downloads",
    sublabel: "AxionAOSP Official Builds",
  },
  {
    value: "1,100+",
    numericValue: 1100,
    label: "GitHub Contributions",
    sublabel: "Open-Source Architecture",
  },
  {
    value: "23+",
    numericValue: 23,
    label: "GitHub Stars",
    sublabel: "Android Porting Documentation",
  },
];
