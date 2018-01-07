
class RobotArmNormalizationProvider {
    constructor(newinputLength, newoutputLength) {
        this.inputLength = newinputLength;
        this.outputLength = newoutputLength;
        this.armLength = 180;
    }


    NormalizeOutput(values) {
        // if (values.length !== this.outputLength) {
        //     console.error('error - values length not equal outputlength');
        //     return;
        // }

        // if (!(values[0] >= 0 && values[0] <= 180 &&
        //     values[1] >= 0 && values[1] <= 360)) {
        //     console.error('error - values not correctt');
        //     return;
        // }

        let result = new Array(this.outputLength);

        result[0] = (values[0] / 180);
        result[1] = (values[1] / 180);

        result[0] = (result[0] * 0.8) + 0.1;
        result[1] = (result[1] * 0.8) + 0.1;

        // if (!(result[0] >= 0.1 && result[0] <= 0.9 &&
        //     result[1] >= 0.1 && result[1] <= 0.9)) {
        //     console.error('error - result not correctt');
        //     return;
        // }

        return result;
    }

    UnnormalizeOutput(values) {
        // Debug.Assert(values.Length == _outputLength);

        // Debug.Assert(values[0] >= 0.1 && values[0] <= 0.9);
        // Debug.Assert(values[1] >= 0.1 && values[1] <= 0.9);

        let result = new Array(this.outputLength);

        result[0] = (values[0] - 0.1) / 0.8;
        result[1] = (values[1] - 0.1) / 0.8;

        result[0] *= 180;
        result[1] *= 180;

        // Debug.Assert(result[0] >= 0 && result[0] <= 180);
        // Debug.Assert(result[1] >= 0 && result[1] <= 360);

        return result;
    }

    NormalizeInput(values) {
        //Debug.Assert(values.Length == _inputLength);

        let result = new Array(this.inputLength);

        result[0] = (values[0] + (this.armLength)) / (this.armLength * 3);
        result[1] = (values[1] + (this.armLength * 2)) / (this.armLength * 4);

        result[0] = (result[0] * 0.8) + 0.1;
        result[1] = (result[1] * 0.8) + 0.1;
        //Debug.Assert(result[0] >= 0.1 && result[0] <= 0.9);
        //Debug.Assert(result[1] >= 0.1 && result[1] <= 0.9);

        return result;
    }

    UnnormalizeInput(values) {
        // Debug.Assert(values.Length == _inputLength);

        // Debug.Assert(values[0] >= 0.1 && values[0] <= 0.9);
        // Debug.Assert(values[1] >= 0.1 && values[1] <= 0.9);

        let result = new Array(this.inputLength);

        result[0] = (values[0] - 0.1) / 0.8;
        result[1] = (values[1] - 0.1) / 0.8;

        result[0] = (result[0] * (this.armLength * 3)) - (this.armLength);
        result[1] = (result[1] * (this.armLength * 4)) - (this.armLength * 2);

        return result;
    }
}