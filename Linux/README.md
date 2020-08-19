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