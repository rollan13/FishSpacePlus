#!/usr/bin/env python

import matplotlib
matplotlib.use('Agg')
from matplotlib import animation
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

from scipy.io import loadmat, savemat
import pandas as pd
import numpy as np
import json
import sys
import io


def __draw_figure_ccres(fig, json_data, **kwargs):

    gs1 = gridspec.GridSpec(1,2)
    gs1.update(wspace=0, hspace=0)

    reef_data = np.array(json_data['reef_fish']['biomass_grid'])
    geog_mask = 1 * (loadmat("data/ElNidoSHP_MATfile_06Sep2016.mat")['WATER'] > 0)
    grid = reef_data * geog_mask
    #
    the_mask = np.ma.masked_where(geog_mask == 1, geog_mask)
    oth_mask = np.ma.masked_where((reef_data > 0) + (geog_mask == 0),  geog_mask)

    fig.clf()
    ax = fig.add_subplot(gs1[1])
    fish_map = ax.imshow(np.flipud(grid), interpolation='nearest')
    ax.set_xticks([])
    ax.set_yticks([])
    Kp = 800
    cbar = fig.colorbar(fish_map, ticks=[0, Kp/4.0, Kp/2.0, 3*Kp/4.0])
    cbar.set_ticklabels(['0', '$K_p /4$', '$K_p /2$', '$> 3K_p /4$'])
    fish_map.set_clim(0, 3*Kp/4.0)


    ax.imshow(np.flipud(1 - the_mask), cmap='summer', interpolation='none')
    ax.imshow(np.flipud(1 - oth_mask), cmap='Reds', interpolation='none')
    # ax.imshow(np.flipud(reef_data), cmap='Reds', interpolation='none')
    ax.text(12.5, 25, json_data['time'], fontsize=15, color='black')

    ax2 = fig.add_subplot(gs1[0])

    fishing_lattice = np.array(json_data['reef_fish']['fisher_locs'])

    fisher_map = ax2.imshow(np.flipud(fishing_lattice), interpolation='none', cmap='Reds')
    ax2.imshow(np.flipud(1 - the_mask), cmap='summer', interpolation='none')
    ax2.set_xticks([])
    ax2.set_yticks([])


def __draw_figure_ccrespick(fig, json_data, **kwargs):

    gs1 = gridspec.GridSpec(1,2)
    gs1.update(wspace=0, hspace=0)

    reef_data = np.array(json_data['reef_fish']['biomass_grid'])
    geog_mask = 1 * (loadmat("data/ElNidoSHP_MATfile_06Sep2016.mat")['WATER'] > 0)
    grid = reef_data * geog_mask
    #
    the_mask = np.ma.masked_where(geog_mask == 1, geog_mask)
    oth_mask = np.ma.masked_where((reef_data > 0) + (geog_mask == 0),  geog_mask)

    fig.clf()
    ax = fig.add_subplot(gs1[1])
    fish_map = ax.imshow(np.flipud(grid), interpolation='nearest')
    ax.set_xticks([])
    ax.set_yticks([])
    Kp = 800
    cbar = fig.colorbar(fish_map, ticks=[0, Kp/4.0, Kp/2.0, 3*Kp/4.0])
    cbar.set_ticklabels(['0', '$K_p /4$', '$K_p /2$', '$> 3K_p /4$'])
    fish_map.set_clim(0, 3*Kp/4.0)


    ax.imshow(np.flipud(1 - the_mask), cmap='summer', interpolation='none')
    ax.imshow(np.flipud(1 - oth_mask), cmap='Reds', interpolation='none')
    # ax.imshow(np.flipud(reef_data), cmap='Reds', interpolation='none')
    ax.text(12.5, 25, json_data['time'], fontsize=15, color='black')

    ax2 = fig.add_subplot(gs1[0])

    fishing_lattice = np.zeros(geog_mask.shape)
    for pos in json_data['reef_fish']['fisher_locs']:
        x, y = pos[0]
        if x >= 0:
            fishing_lattice[x][y] = 1


    fisher_map = ax2.imshow(np.flipud(fishing_lattice), interpolation='none', cmap='Reds')
    ax2.imshow(np.flipud(1 - the_mask), cmap='summer', interpolation='none')
    ax2.set_xticks([])
    ax2.set_yticks([])


def plot_figuremod(filename):
    fig = plt.figure(figsize=[10, 6])
    Writer = matplotlib.animation.writers['ffmpeg']
    writer = Writer(fps=12, metadata=dict(artist='FISHSPACE'), bitrate=1800)
    with writer.saving(fig, ".".join(filename.split(".")[:-1]) + ".mp4", 100) as _ ,\
             io.open(filename) as data_file:
        for index, line in enumerate(data_file):
            json_data = json.loads(line)
            print(index, json_data['time'])
            __draw_figure_ccrespick(fig, json_data)
            writer.grab_frame()


def plot_figure(filename):
    fig = plt.figure(figsize=[10, 6])
    Writer = matplotlib.animation.writers['ffmpeg']
    writer = Writer(fps=12, metadata=dict(artist='FISHSPACE'), bitrate=1800)
    with writer.saving(fig, ".".join(filename.split(".")[:-1]) + ".mp4", 100) as _ ,\
             io.open(filename) as data_file:
        for index, line in enumerate(data_file):
            json_data = json.loads(line)
            __draw_figure_ccres(fig, json_data)
            writer.grab_frame()

def convert_to_mat(filename):
    with io.open(filename) as datafile:
        ## Inspect first line for details
        first_line = json.loads(datafile.readline())
        headers = [i for i in first_line if i in ['reef_fish', 'pelagic_fish']]
        dataset = { head:{} for head in headers }
        for header in headers:
            for name, content in first_line[header].items():
                # if 0-d (scalar), forces the array to be 1-d. If 2-d, forces
                # the array to be 3-d with dim 1 x M x N.
                arrayify = np.array([content])
                dataset[header][name] = arrayify

        # .. and for the rest of the file, append the arrays
        for index, line in enumerate(datafile):
            data = json.loads(line)
            for header in headers:
                for name, content in data[header].items():
                    dataset[header][name] = np.append(dataset[header][name], np.array([content]), axis=0)

        # Flatten array to make it MATLAB-friendly when unpacked as variables
        new_array = {}
        for header in headers:
            for name, content in dataset[header].items():
                new_array[header + "_" + name] = content
        savemat(".".join(filename.split(".")[:-1]) + ".mat", new_array)


def convert_to_csv(filename):

    with io.open(filename) as data_file:
        first_line = json.loads(data_file.readline())
        headers = [i for i in first_line if i in ['reef_fish', 'pelagic_fish']]
        data = { header : [] for header in headers }
        data_file.seek(0) # Rewind!

        for line in data_file:
            json_data = json.loads(line)
            for head in headers:
                data[head].append(json_data[head]['total_biomass'])

    cols, vals = zip(*data.items())
    vals = list(vals)[0] if len(vals) == 1 else list(vals)
    df = pd.DataFrame(list(vals), columns=cols)
    df.to_csv(".".join(filename.split(".")[:-1]) + ".csv", index=False)


choices = {
    'TO_CSV': convert_to_csv,
    'PLOT_FIGURE': plot_figure,
    'PLOT_FIGUREMOD': plot_figuremod,
    'TO_MAT': convert_to_mat
}

if __name__ == '__main__':
    choices[sys.argv[1]](sys.argv[2])
