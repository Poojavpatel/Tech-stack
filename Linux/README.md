## Table of contents
- [Operating Systems and Linux](#operating-systems-and-linux)
- [Basic Linux and Unix Commands](#basic-linux-and-unix-commands)
- [Mac setup](#mac-setup)

## Operating Systems and Linux

* An operating system (or OS) is a **group of computer programs**, including **device drivers, kernels, and other software** that **lets people interact with a computer**
* It manages computer hardware and software resources
* It provides common services for computer programs
* A software which performs all the basic tasks like **file management, memory management, process management, handling input and output, and controlling peripheral devices such as disk drives and printers**
* **Allocating computer resources to various functions**
* An operating system is the most important software that runs on a computer. It manages the computer's memory and processes, as well as all of its software and hardware

---

## Basic Linux and Unix Commands
---

### Set Environment Variables
Display Current Environment
```bash
$ set
```

You can display the value of a variable using printf or echo command
```bash
$ echo "$HOME"
$ printf "%s\n" $HOME
```

Set Environment Variables
```bash
$ export PATH=${PATH}:/home/pooja/bin
$ export VEHICLE_TYPE="cars"
```
If you are using Bash, you can declare the variables in the ~/.bashrc
```bash
$ export PATH="my/new/path"
```

To load the new environment variables into the current shell session use the source command
```bash
$ source ~/.bashrc
```
---
### Fix screen rotation ubuntu
```bash
$ xrandr -o normal
```
Permanently turn off screen rotation
```bash
$ gsettings set org.gnome.settings-daemon.peripherals.touchscreen orientation-lock true
$ gsettings set org.gnome.settings-daemon.plugins.orientation active false
```
---
### List all vscode extensions
```bash
$ code --list-extensions
```
---
### Install GPaste in Ubuntu or Debian
```bash
$ sudo apt install gnome-shell-extensions-gpaste gpaste
```
After the installation completes, restart Gnome Shell by pressing Alt + F2 and typing r, then pressing the Enter key.

---

*nix just means operating systems that are like the old workhorse Unix. Some examples include Linux, FreeBSD, and Mac OS X (its kernel, Darwin, is based on BSD).

The main relation between *nix and Ruby is just a pragmatic one; most Ruby developers seem to prefer to work on Unix-like OSes (typically Linux or Mac OS X). There's no official relationship, and it's quite possible to work with Ruby on non-*nix OSes like Windows.

--- 
## Mac setup

### mac change screenshot location
Press Command + Shift + 5.   
Click on Options.   
Now either pick a folder that is listed, or choose Other Location.   
If you choose Other Locaiton you can navigate to the folder you wish the screenshot to go to, or create a folder if required.

## Mac Shortcuts 

Command ⌘ + `  - To switch between windows of the same application