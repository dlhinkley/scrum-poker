FROM node:13

WORKDIR /home/node


# Add google repo
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

# Add repo key
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub |  apt-key add - 

# Update repo
RUN apt-get update -y

# Install google chrome
RUN apt-get install -y \
      google-chrome-stable \
      xvfb


