const SEARCH_INDEX = [
    // ── Interactive Screen Boards (iwb.html) ────────────────────────────────
    {
        pageUrl: 'iwb.html',
        pageTitle: 'Interactive Screen Boards',
        anchor: 'check-project-options-in-windows',
        title: '📽️ Check Project options in Windows',
        content: 'Your screen may not display anything if your laptop is set to work with only one monitor. Change to Duplicate or Extend by pressing Win + P. Duplicate shows the same desktop on both screens. Extend creates two separate desktops.'
    },
    {
        pageUrl: 'iwb.html',
        pageTitle: 'Interactive Screen Boards',
        anchor: 'check-source-signal-on-your-screen',
        title: '📶 Check Source signal on your screen',
        content: 'Cycle through the inputs using the Source or Input button until your desktop appears. The Source button could be on the screen\'s bezel or external control panel. Test all available HDMI source options as your device could be connected to any of them.'
    },
    {
        pageUrl: 'iwb.html',
        pageTitle: 'Interactive Screen Boards',
        anchor: 'is-whiteboard-powered-on',
        title: '⚡ Is Whiteboard powered ON?',
        content: 'All screens have a power button and mode indicator. A red LED means standby mode, green LED means power is on. The whiteboard may also have a power switch behind the screen — an I/O toggle switch, ensure it is set to the "I" position.'
    },
    {
        pageUrl: 'iwb.html',
        pageTitle: 'Interactive Screen Boards',
        anchor: 'check-your-cables',
        title: '🔌 Check your cables',
        content: 'Problems with your screen may be caused by disconnected cables. Setup varies depending on whether you use a docking station. Check the USB-C cable connecting your laptop to the dock. If no docking station, check the HDMI cable for screen image and USB cable for touchscreen functionality.'
    },
    {
        pageUrl: 'iwb.html',
        pageTitle: 'Interactive Screen Boards',
        anchor: 'checking-power-sockets',
        title: '🔲 Checking power sockets',
        content: 'Your laptop, desktop, monitor, docking station, and whiteboard screen may be plugged into different sockets or power strips. Ensure they are all securely plugged in and that any individual power switches on the sockets are turned on.'
    },
    {
        pageUrl: 'iwb.html',
        pageTitle: 'Interactive Screen Boards',
        anchor: 'any-sound-issues',
        title: '🔇 Any sound issues',
        content: 'Check Screen Volume — ensure the screen is not muted and volume is not 0. Use Volume Down and Volume Up buttons on the screen frame. Check the Browser Tab — right-click and select Unmute tab or Unmute site. Open System Settings via Win + I, go to System > Sound and check Output devices. Check Volume mixer in the Advanced section.'
    },
    {
        pageUrl: 'iwb.html',
        pageTitle: 'Interactive Screen Boards',
        anchor: 'if-nothing-helped-full-setup-reset',
        title: '⚠️ If nothing helped (full setup reset)',
        content: 'Perform a full setup reset. Fully shut down your computer — hold SHIFT then click Start > Power > Shut down. Power down the docking station by unplugging from the wall. Turn off your interactive screen using the I/O power switch. Wait 60 seconds before turning devices back on in any order.'
    },

    // ── Printing Issues (print.html) ─────────────────────────────────────────
    {
        pageUrl: 'print.html',
        pageTitle: 'Printing Issues',
        anchor: 'oops-i-forgot-my-pin-code',
        title: '🔑 Oops, I forgot my PIN code',
        content: 'Visit your school\'s uniFLOW website. Bishop Aldhelms, Wimborne First, and Pimperne Primary all have unique login links. Click "Continue with [Your School Name]". Access your Dashboard from the left-side menu. In the Identities section, locate the PIN option, click the three-dot menu and select Show PIN code.'
    },
    {
        pageUrl: 'print.html',
        pageTitle: 'Printing Issues',
        anchor: 'check-printer-name',
        title: '🏷️ Check Printer name',
        content: 'When you are ready to print, a print dialogue window will appear. Select which printer you wish to use. Printer names vary by school. Common examples: WFS_Print, CanonSecurePrint, Secure Print. If unsure, ask a colleague to check their print dialogue using Ctrl + P.'
    },
    {
        pageUrl: 'print.html',
        pageTitle: 'Printing Issues',
        anchor: 'uniflow-app-check',
        title: '🔄 uniFLOW app check',
        content: 'The uniFLOW app must be running on your device before you print. Check the system tray in the bottom-right corner for the uniFLOW icon. To start the app, press the Windows Start button, type "uniFLOW" and click Open. You can also Re-register the app connection from the settings window.'
    },
    {
        pageUrl: 'print.html',
        pageTitle: 'Printing Issues',
        anchor: 'windows-printing-queue-check',
        title: '⏳ Windows printing queue check',
        content: 'Open Windows settings with Win + I. Go to Bluetooth & Devices > Printers & scanners and select your printer. Click Print Queue to see all print jobs. Some may show an Error status — this is normal. To delete a print job, right-click and select Cancel. Clearing all failed jobs should allow the printer to work again.'
    },

    // ── Laptop / Desktop Issues (laptops_desktop.html) ───────────────────────
    {
        pageUrl: 'laptops_desktop.html',
        pageTitle: 'Laptop / Desktop Issues',
        anchor: 'i-cant-turn-on-my-laptop',
        title: '💻 I can\'t turn on my laptop',
        content: 'If the screen remains blank after pressing the power button or lights blink without display: First, connect your charger — the battery may be depleted. Second, try a hard reset by pressing and holding the power button for 10 to 15 seconds. This can clear an energy-saving mode that makes the laptop appear off. Release and press once more to turn on.'
    },

    // ── Other IT Issues (other.html) ─────────────────────────────────────────
    {
        pageUrl: 'other.html',
        pageTitle: 'Other IT Issues',
        anchor: 'itrent-payslip-access-problems',
        title: '💸 iTrent Payslip Access Problems',
        content: 'If you are experiencing issues accessing the iTrent service, or if you are seeing error messages such as "Invalid login" or "Check your internet connection," please follow these steps to ensure you are logging in correctly. Access iTrent by visiting the Hamwic intranet website under System Links > Link to Neo payroll, or go directly to the iTrent web service. Login using your work email address as username, and your password (usually your bank account number). Open the Microsoft Authenticator app on your phone to retrieve the 6-digit verification code.'
    },
    {
        pageUrl: 'other.html',
        pageTitle: 'Other IT Issues',
        anchor: 'how-to-set-up-a-signature-for-all-your-emails-in-outlook',
        title: '💌 How to set up a signature for all your emails in Outlook',
        content: 'Prepare your email signature in Microsoft Word first, then copy it to Outlook. Use a table with invisible borders, image on the left, text on the right. Select all with Ctrl + A, copy with Ctrl + C. In Outlook, click the gear icon to open Settings. Search "Signatures", click Add signature, name it, paste with Ctrl + V, and save. Check default settings before saving.'
    }
];
